# Mermaid Diagram Creator

A utility for creating Mermaid diagrams from structured data with PNG export capability.

## Features

- **Multiple Diagram Types**: Support for flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, and mindmaps
- **Structured Data Input**: Create diagrams from JavaScript objects instead of writing raw Mermaid syntax
- **Raw Definition Support**: Pass raw Mermaid code directly when needed
- **PNG Export**: Download diagrams as high-quality PNG images
- **Browser & Node.js**: Works in both environments
- **Customizable Themes**: Choose from multiple themes (default, dark, forest, neutral)
- **Configurable Export**: Adjust scale, background color, and padding for PNG exports

## Installation

No installation required for the HTML version - just open [`mermaid-diagram.html`](mermaid-diagram.html) in a browser.

For Node.js usage:

```bash
# Clone or copy the mermaid-diagram-creator folder to your project
```

## Quick Start

### Browser (HTML Version)

1. Open [`mermaid-diagram.html`](mermaid-diagram.html) in any modern browser
2. Enter your Mermaid diagram code in the editor
3. Click "Render Diagram" to preview
4. Click "Download PNG" to save the diagram

### Node.js

```javascript
const MermaidDiagramCreator = require('./mermaid-diagram-creator');

// Create a flowchart from structured data
const diagramData = {
  type: 'flowchart',
  title: 'My Flowchart',
  direction: 'TD',
  content: {
    nodes: [
      { id: 'A', label: 'Start', shape: 'stadium' },
      { id: 'B', label: 'Process', shape: 'rect' },
      { id: 'C', label: 'End', shape: 'stadium' }
    ],
    links: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' }
    ]
  }
};

const diagram = MermaidDiagramCreator.createDiagram(diagramData);
console.log(diagram.definition);
```

## API Reference

### `createDiagram(diagramData, config)`

Creates a diagram object from structured data.

**Parameters:**
- `diagramData` (Object): The diagram configuration
  - `type` (string): Diagram type (see supported types below)
  - `title` (string, optional): Diagram title
  - `content` (Object): Structured content (varies by type)
  - `definition` (string): Raw Mermaid code (alternative to content)
  - `direction` (string): Flow direction for flowcharts (TD, LR, BT, RL)
- `config` (Object, optional): Configuration overrides

**Returns:** Diagram object with `definition`, `config`, `type`, `title`, and `metadata`

### `validateDiagramData(diagramData)`

Validates diagram data structure.

**Returns:** Object with `isValid` (boolean) and `errors` (array)

### `renderToContainer(diagram, container)` (Browser only)

Renders a diagram to an HTML element.

**Parameters:**
- `diagram`: Diagram object from `createDiagram()`
- `container` (HTMLElement): Container element for the diagram

**Returns:** Promise resolving to SVG string

### `exportAsPNG(diagram, options)` (Browser only)

Exports diagram as PNG blob.

**Options:**
- `scale` (number): Image scale factor (default: 2)
- `backgroundColor` (string): Background color (default: '#ffffff')
- `padding` (number): Padding in pixels (default: 20)
- `quality` (number): Image quality 0-1 (default: 1.0)

**Returns:** Promise resolving to Blob

### `downloadAsPNG(diagram, filename, options)` (Browser only)

Triggers browser download of diagram as PNG.

## Supported Diagram Types

### 1. Flowchart

```javascript
{
  type: 'flowchart',
  direction: 'TD', // TD, LR, BT, RL
  content: {
    nodes: [
      { id: 'A', label: 'Start', shape: 'stadium' },
      { id: 'B', label: 'Process', shape: 'rect' },
      { id: 'C', label: 'Decision', shape: 'diamond' }
    ],
    links: [
      { from: 'A', to: 'B', label: 'label', style: 'arrow' }
    ]
  }
}
```

**Node Shapes:**
- `rect` - Rectangle (default)
- `rounded` - Rounded rectangle
- `stadium` - Stadium shape
- `diamond` - Diamond/rhombus
- `hexagon` - Hexagon
- `circle` - Circle

**Link Styles:**
- `arrow` - Solid arrow (default)
- `dotted` - Dotted line
- `thick` - Thick arrow
- `none` - No arrow

### 2. Sequence Diagram

```javascript
{
  type: 'sequenceDiagram',
  content: {
    actors: [
      { id: 'A', type: 'participant', alias: 'Service A' },
      { id: 'B', type: 'actor' }
    ],
    messages: [
      { from: 'A', to: 'B', label: 'Request', type: 'solid' }
    ]
  }
}
```

### 3. Class Diagram

```javascript
{
  type: 'classDiagram',
  content: {
    classes: [
      {
        name: 'User',
        attributes: [
          { visibility: '-', name: 'id', type: 'UUID' }
        ],
        methods: [
          { visibility: '+', name: 'login', params: 'creds', returnType: 'Boolean' }
        ]
      }
    ],
    relationships: [
      { from: 'User', to: 'Order', type: 'association', label: 'places' }
    ]
  }
}
```

**Relationship Types:**
- `extends`, `implements`, `composition`, `aggregation`, `association`, `dependency`

### 4. State Diagram

```javascript
{
  type: 'stateDiagram-v2',
  content: {
    states: [
      { id: 'Idle', label: 'Idle State' },
      { id: 'Active', label: 'Active State' }
    ],
    transitions: [
      { from: 'Idle', to: 'Active', label: 'activate' }
    ]
  }
}
```

### 5. ER Diagram

```javascript
{
  type: 'erDiagram',
  content: {
    entities: [
      {
        name: 'USER',
        attributes: [
          { type: 'int', name: 'id', key: 'PK' },
          { type: 'string', name: 'name' }
        ]
      }
    ],
    relationships: [
      { from: 'USER', to: 'ORDER', cardinality: '||--o{', label: 'places' }
    ]
  }
}
```

### 6. Gantt Chart

```javascript
{
  type: 'gantt',
  dateFormat: 'YYYY-MM-DD',
  content: {
    title: 'Project Timeline',
    sections: [
      {
        name: 'Phase 1',
        tasks: [
          { name: 'Task 1', id: 't1', start: '2024-01-01', duration: '7d' }
        ]
      }
    ]
  }
}
```

### 7. Pie Chart

```javascript
{
  type: 'pie',
  content: {
    title: 'Distribution',
    data: [
      { label: 'Category A', value: 40 },
      { label: 'Category B', value: 60 }
    ]
  }
}
```

### 8. Mindmap

```javascript
{
  type: 'mindmap',
  content: {
    root: {
      text: 'Central Idea',
      children: [
        { text: 'Branch 1', children: [{ text: 'Sub-branch' }] },
        { text: 'Branch 2' }
      ]
    }
  }
}
```

### 9. Raw Definition

```javascript
{
  type: 'flowchart',
  definition: `flowchart TD
    A[Start] --> B[End]`
}
```

## HTML Version Features

The [`mermaid-diagram.html`](mermaid-diagram.html) file provides a complete browser-based diagram editor:

- **Live Preview**: See your diagram rendered in real-time
- **Example Templates**: Pre-built examples for all diagram types
- **Theme Selection**: Choose from 4 built-in themes
- **Export Options**: Configure scale (1x-4x), background color, and filename
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + Enter` - Render diagram
  - `Ctrl/Cmd + S` - Download PNG

## File Structure

```
mermaid-diagram-creator/
  index.js              # Main utility module
  mermaid-diagram.html  # Browser-based editor
  examples.js           # Usage examples
  README.md             # Documentation
```

## Browser Compatibility

The HTML version works in all modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

- **Browser**: Mermaid.js (loaded via CDN)
- **Node.js**: No dependencies for diagram generation; browser environment required for rendering and PNG export

## Tips

1. **High-Quality Exports**: Use scale 3x or 4x for print-quality images
2. **Transparent Background**: Set background to "transparent" for overlaying on other content
3. **Large Diagrams**: Increase padding for diagrams with elements near edges
4. **Custom Styling**: Use raw definitions with Mermaid's `style` commands for custom colors

## License

MIT License - Feel free to use in personal and commercial projects.

## Contributing

Contributions welcome! Please submit issues and pull requests on the repository.