/**
 * Mermaid Diagram Creator Utility
 *
 * This utility accepts diagram data from a variable and creates
 * Mermaid diagrams with PNG download capability.
 *
 * @module mermaid-diagram-creator
 */

const MermaidDiagramCreator = {
  /**
   * Default configuration for diagram rendering
   */
  defaultConfig: {
    theme: 'default',
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    flowchart: {
      htmlLabels: true,
      curve: 'basis'
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65
    }
  },

  /**
   * Supported diagram types
   */
  diagramTypes: {
    FLOWCHART: 'flowchart',
    SEQUENCE: 'sequenceDiagram',
    CLASS: 'classDiagram',
    STATE: 'stateDiagram-v2',
    ER: 'erDiagram',
    GANTT: 'gantt',
    PIE: 'pie',
    MINDMAP: 'mindmap',
    TIMELINE: 'timeline',
    GITGRAPH: 'gitGraph'
  },

  /**
   * Validates diagram data structure
   * @param {Object} diagramData - The diagram data to validate
   * @returns {Object} Validation result with isValid and errors
   */
  validateDiagramData(diagramData) {
    const errors = [];

    if (!diagramData) {
      errors.push('Diagram data is required');
      return { isValid: false, errors };
    }

    if (!diagramData.type) {
      errors.push('Diagram type is required');
    }

    if (!diagramData.content && !diagramData.definition) {
      errors.push('Diagram content or definition is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Generates Mermaid diagram definition from structured data
   * @param {Object} diagramData - Structured diagram data
   * @returns {string} Mermaid diagram definition
   */
  generateDefinition(diagramData) {
    const { type, content, definition, direction = 'TD' } = diagramData;

    // If raw definition is provided, use it directly
    if (definition) {
      return definition;
    }

    // Generate definition based on diagram type
    switch (type) {
      case this.diagramTypes.FLOWCHART:
        return this.generateFlowchart(content, direction);
      case this.diagramTypes.SEQUENCE:
        return this.generateSequence(content);
      case this.diagramTypes.CLASS:
        return this.generateClassDiagram(content);
      case this.diagramTypes.STATE:
        return this.generateStateDiagram(content);
      case this.diagramTypes.ER:
        return this.generateERDiagram(content);
      case this.diagramTypes.GANTT:
        return this.generateGantt(content);
      case this.diagramTypes.PIE:
        return this.generatePie(content);
      case this.diagramTypes.MINDMAP:
        return this.generateMindmap(content);
      default:
        return content || definition;
    }
  },

  /**
   * Generates flowchart definition
   * @param {Object} content - Flowchart content
   * @param {string} direction - Flow direction (TD, LR, BT, RL)
   * @returns {string} Mermaid flowchart definition
   */
  generateFlowchart(content, direction = 'TD') {
    let definition = `flowchart ${direction}\n`;

    if (content.nodes && Array.isArray(content.nodes)) {
      content.nodes.forEach(node => {
        const shape = node.shape || 'rect';
        const label = node.label || node.id;

        switch (shape) {
          case 'rounded':
            definition += `    ${node.id}(${label})\n`;
            break;
          case 'stadium':
            definition += `    ${node.id}([${label}])\n`;
            break;
          case 'diamond':
            definition += `    ${node.id}{${label}}\n`;
            break;
          case 'hexagon':
            definition += `    ${node.id}{{${label}}}\n`;
            break;
          case 'circle':
            definition += `    ${node.id}((${label}))\n`;
            break;
          default:
            definition += `    ${node.id}[${label}]\n`;
        }
      });
    }

    if (content.links && Array.isArray(content.links)) {
      content.links.forEach(link => {
        const label = link.label ? `|${link.label}|` : '';
        const style = link.style || 'arrow';

        switch (style) {
          case 'dotted':
            definition += `    ${link.from} -.->${label} ${link.to}\n`;
            break;
          case 'thick':
            definition += `    ${link.from} ==>${label} ${link.to}\n`;
            break;
          case 'none':
            definition += `    ${link.from} ---${label} ${link.to}\n`;
            break;
          default:
            definition += `    ${link.from} -->${label} ${link.to}\n`;
        }
      });
    }

    return definition;
  },

  /**
   * Generates sequence diagram definition
   * @param {Object} content - Sequence diagram content
   * @returns {string} Mermaid sequence diagram definition
   */
  generateSequence(content) {
    let definition = 'sequenceDiagram\n';

    if (content.actors && Array.isArray(content.actors)) {
      content.actors.forEach(actor => {
        if (actor.type === 'participant') {
          definition += `    participant ${actor.id}${actor.alias ? ` as ${actor.alias}` : ''}\n`;
        } else {
          definition += `    actor ${actor.id}\n`;
        }
      });
    }

    if (content.messages && Array.isArray(content.messages)) {
      content.messages.forEach(msg => {
        const arrow = msg.type === 'dashed' ? '-->>' : '->>';
        const label = msg.label || '';
        definition += `    ${msg.from}${arrow} ${msg.to}: ${label}\n`;
      });
    }

    return definition;
  },

  /**
   * Generates class diagram definition
   * @param {Object} content - Class diagram content
   * @returns {string} Mermaid class diagram definition
   */
  generateClassDiagram(content) {
    let definition = 'classDiagram\n';

    if (content.classes && Array.isArray(content.classes)) {
      content.classes.forEach(cls => {
        definition += `    class ${cls.name} {\n`;

        if (cls.attributes && Array.isArray(cls.attributes)) {
          cls.attributes.forEach(attr => {
            definition += `        ${attr.visibility || '+'}${attr.name}: ${attr.type}\n`;
          });
        }

        if (cls.methods && Array.isArray(cls.methods)) {
          cls.methods.forEach(method => {
            definition += `        ${method.visibility || '+'}${method.name}(${method.params || ''}) ${method.returnType ? ': ' + method.returnType : ''}\n`;
          });
        }

        definition += '    }\n';
      });
    }

    if (content.relationships && Array.isArray(content.relationships)) {
      content.relationships.forEach(rel => {
        const symbols = {
          extends: '<|--',
          implements: '<|..',
          composition: '*--',
          aggregation: 'o--',
          association: '-->',
          dependency: '<..'
        };
        const symbol = symbols[rel.type] || '-->';
        definition += `    ${rel.from} ${symbol} ${rel.to}${rel.label ? ` : ${rel.label}` : ''}\n`;
      });
    }

    return definition;
  },

  /**
   * Generates state diagram definition
   * @param {Object} content - State diagram content
   * @returns {string} Mermaid state diagram definition
   */
  generateStateDiagram(content) {
    let definition = 'stateDiagram-v2\n';

    if (content.states && Array.isArray(content.states)) {
      content.states.forEach(state => {
        if (state.type === 'start') {
          definition += '    [*]\n';
        } else if (state.type === 'end') {
          definition += `    ${state.id} --> [*]\n`;
        } else if (state.composite) {
          definition += `    state ${state.id} {\n`;
          state.composite.forEach(sub => {
            definition += `        ${sub}\n`;
          });
          definition += '    }\n';
        } else {
          definition += `    ${state.id}${state.label ? ` : ${state.label}` : ''}\n`;
        }
      });
    }

    if (content.transitions && Array.isArray(content.transitions)) {
      content.transitions.forEach(trans => {
        definition += `    ${trans.from} --> ${trans.to}${trans.label ? ` : ${trans.label}` : ''}\n`;
      });
    }

    return definition;
  },

  /**
   * Generates ER diagram definition
   * @param {Object} content - ER diagram content
   * @returns {string} Mermaid ER diagram definition
   */
  generateERDiagram(content) {
    let definition = 'erDiagram\n';

    if (content.entities && Array.isArray(content.entities)) {
      content.entities.forEach(entity => {
        definition += `    ${entity.name} {\n`;
        if (entity.attributes && Array.isArray(entity.attributes)) {
          entity.attributes.forEach(attr => {
            definition += `        ${attr.type} ${attr.name}${attr.key ? ' ' + attr.key : ''}\n`;
          });
        }
        definition += '    }\n';
      });
    }

    if (content.relationships && Array.isArray(content.relationships)) {
      content.relationships.forEach(rel => {
        definition += `    ${rel.from} ${rel.cardinality || '||'}--|{ ${rel.to} : "${rel.label}"\n`;
      });
    }

    return definition;
  },

  /**
   * Generates Gantt chart definition
   * @param {Object} content - Gantt chart content
   * @returns {string} Mermaid Gantt chart definition
   */
  generateGantt(content) {
    let definition = 'gantt\n';
    definition += `    title ${content.title || 'Project Schedule'}\n`;
    definition += `    dateFormat ${content.dateFormat || 'YYYY-MM-DD'}\n`;

    if (content.sections && Array.isArray(content.sections)) {
      content.sections.forEach(section => {
        definition += `\n    section ${section.name}\n`;
        if (section.tasks && Array.isArray(section.tasks)) {
          section.tasks.forEach(task => {
            const status = task.status ? task.status + ',' : '';
            definition += `        ${task.name}           :${status}${task.id || ''} ${task.start}, ${task.duration || task.end}\n`;
          });
        }
      });
    }

    return definition;
  },

  /**
   * Generates pie chart definition
   * @param {Object} content - Pie chart content
   * @returns {string} Mermaid pie chart definition
   */
  generatePie(content) {
    let definition = `pie showData\n`;
    definition += `    title ${content.title || 'Pie Chart'}\n`;

    if (content.data && Array.isArray(content.data)) {
      content.data.forEach(item => {
        definition += `    "${item.label}" : ${item.value}\n`;
      });
    }

    return definition;
  },

  /**
   * Generates mindmap definition
   * @param {Object} content - Mindmap content
   * @returns {string} Mermaid mindmap definition
   */
  generateMindmap(content) {
    let definition = 'mindmap\n';

    const buildMindmap = (node, indent = '  ') => {
      let result = `${indent}${node.text}\n`;
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
          result += buildMindmap(child, indent + '  ');
        });
      }
      return result;
    };

    if (content.root) {
      definition += buildMindmap(content.root);
    }

    return definition;
  },

  /**
   * Creates a complete diagram object ready for rendering
   * @param {Object} diagramData - The diagram data
   * @param {Object} config - Optional configuration overrides
   * @returns {Object} Complete diagram object
   */
  createDiagram(diagramData, config = {}) {
    const validation = this.validateDiagramData(diagramData);

    if (!validation.isValid) {
      throw new Error(`Invalid diagram data: ${validation.errors.join(', ')}`);
    }

    const definition = this.generateDefinition(diagramData);
    const mergedConfig = { ...this.defaultConfig, ...config };

    return {
      definition,
      config: mergedConfig,
      type: diagramData.type,
      title: diagramData.title || 'Untitled Diagram',
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0.0'
      }
    };
  },

  /**
   * Renders diagram to a container element (browser environment)
   * @param {Object} diagram - The diagram object from createDiagram
   * @param {HTMLElement} container - The container element
   * @returns {Promise<string>} The rendered SVG
   */
  async renderToContainer(diagram, container) {
    if (typeof window === 'undefined' || !window.mermaid) {
      throw new Error('This method requires a browser environment with Mermaid.js loaded');
    }

    const { definition, config } = diagram;

    // Configure mermaid
    mermaid.initialize(config);

    // Generate unique ID
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      const { svg } = await mermaid.render(id, definition);
      container.innerHTML = svg;
      return svg;
    } catch (error) {
      throw new Error(`Failed to render diagram: ${error.message}`);
    }
  },

  /**
   * Exports diagram as PNG (browser environment)
   * @param {Object} diagram - The diagram object
   * @param {Object} options - Export options
   * @returns {Promise<Blob>} PNG blob
   */
  async exportAsPNG(diagram, options = {}) {
    const {
      scale = 2,
      backgroundColor = '#ffffff',
      padding = 20,
      quality = 1.0
    } = options;

    if (typeof window === 'undefined') {
      throw new Error('This method requires a browser environment');
    }

    // Create temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    try {
      // Render the diagram
      const svg = await this.renderToContainer(diagram, container);

      // Get SVG element
      const svgElement = container.querySelector('svg');
      if (!svgElement) {
        throw new Error('Failed to find SVG element');
      }

      // Get dimensions
      const svgRect = svgElement.getBoundingClientRect();
      const width = svgRect.width + padding * 2;
      const height = svgRect.height + padding * 2;

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert SVG to image
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, padding * scale, padding * scale, svgRect.width * scale, svgRect.height * scale);
          URL.revokeObjectURL(url);

          canvas.toBlob(blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create PNG blob'));
            }
          }, 'image/png', quality);
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load SVG as image'));
        };
        img.src = url;
      });
    } finally {
      document.body.removeChild(container);
    }
  },

  /**
   * Triggers download of diagram as PNG (browser environment)
   * @param {Object} diagram - The diagram object
   * @param {string} filename - The filename for download
   * @param {Object} options - Export options
   */
  async downloadAsPNG(diagram, filename = 'diagram.png', options = {}) {
    const blob = await this.exportAsPNG(diagram, options);
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MermaidDiagramCreator;
} else if (typeof window !== 'undefined') {
  window.MermaidDiagramCreator = MermaidDiagramCreator;
}
