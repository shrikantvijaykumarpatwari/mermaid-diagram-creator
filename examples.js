/**
 * Example Usage for Mermaid Diagram Creator
 * 
 * This file demonstrates how to use the MermaidDiagramCreator utility
 * with various diagram types and data structures.
 */

const MermaidDiagramCreator = require('./index');

// ============================================
// Example 1: Flowchart with Structured Data
// ============================================

const flowchartData = {
  type: 'flowchart',
  title: 'User Registration Flow',
  direction: 'TD',
  content: {
    nodes: [
      { id: 'A', label: 'Start', shape: 'stadium' },
      { id: 'B', label: 'User fills form', shape: 'rect' },
      { id: 'C', label: 'Valid?', shape: 'diamond' },
      { id: 'D', label: 'Save to DB', shape: 'rect' },
      { id: 'E', label: 'Send Email', shape: 'rect' },
      { id: 'F', label: 'Show Error', shape: 'rect' },
      { id: 'G', label: 'End', shape: 'stadium' }
    ],
    links: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D', label: 'Yes' },
      { from: 'C', to: 'F', label: 'No', style: 'dotted' },
      { from: 'D', to: 'E' },
      { from: 'E', to: 'G' },
      { from: 'F', to: 'B', style: 'dotted' }
    ]
  }
};

// ============================================
// Example 2: Sequence Diagram
// ============================================

const sequenceData = {
  type: 'sequenceDiagram',
  title: 'API Authentication Flow',
  content: {
    actors: [
      { id: 'Client', type: 'actor' },
      { id: 'API', type: 'participant', alias: 'API Gateway' },
      { id: 'Auth', type: 'participant', alias: 'Auth Service' },
      { id: 'DB', type: 'participant', alias: 'Database' }
    ],
    messages: [
      { from: 'Client', to: 'API', label: 'POST /login' },
      { from: 'API', to: 'Auth', label: 'Validate credentials' },
      { from: 'Auth', to: 'DB', label: 'Query user' },
      { from: 'DB', to: 'Auth', label: 'User data', type: 'dashed' },
      { from: 'Auth', to: 'API', label: 'JWT Token', type: 'dashed' },
      { from: 'API', to: 'Client', label: '200 OK + Token', type: 'dashed' }
    ]
  }
};

// ============================================
// Example 3: Class Diagram
// ============================================

const classData = {
  type: 'classDiagram',
  title: 'E-Commerce Domain Model',
  content: {
    classes: [
      {
        name: 'User',
        attributes: [
          { visibility: '-', name: 'id', type: 'UUID' },
          { visibility: '-', name: 'email', type: 'String' },
          { visibility: '-', name: 'password', type: 'String' }
        ],
        methods: [
          { visibility: '+', name: 'login', params: 'credentials', returnType: 'Boolean' },
          { visibility: '+', name: 'logout', returnType: 'void' }
        ]
      },
      {
        name: 'Order',
        attributes: [
          { visibility: '-', name: 'id', type: 'UUID' },
          { visibility: '-', name: 'total', type: 'Decimal' },
          { visibility: '-', name: 'status', type: 'OrderStatus' }
        ],
        methods: [
          { visibility: '+', name: 'calculateTotal', returnType: 'Decimal' },
          { visibility: '+', name: 'addItem', params: 'product: Product', returnType: 'void' }
        ]
      },
      {
        name: 'Product',
        attributes: [
          { visibility: '-', name: 'id', type: 'UUID' },
          { visibility: '-', name: 'name', type: 'String' },
          { visibility: '-', name: 'price', type: 'Decimal' }
        ],
        methods: [
          { visibility: '+', name: 'getDetails', returnType: 'ProductDTO' }
        ]
      }
    ],
    relationships: [
      { from: 'User', to: 'Order', type: 'association', label: 'places' },
      { from: 'Order', to: 'Product', type: 'composition', label: 'contains' }
    ]
  }
};

// ============================================
// Example 4: State Diagram
// ============================================

const stateData = {
  type: 'stateDiagram-v2',
  title: 'Order State Machine',
  content: {
    states: [
      { id: 'Pending', label: 'Order Placed' },
      { id: 'Confirmed', label: 'Payment Confirmed' },
      { id: 'Processing', label: 'Being Prepared' },
      { id: 'Shipped', label: 'In Transit' },
      { id: 'Delivered', label: 'Delivered' },
      { id: 'Cancelled', label: 'Order Cancelled' }
    ],
    transitions: [
      { from: '[*]', to: 'Pending', label: 'New Order' },
      { from: 'Pending', to: 'Confirmed', label: 'Payment Success' },
      { from: 'Pending', to: 'Cancelled', label: 'Payment Failed' },
      { from: 'Confirmed', to: 'Processing', label: 'Start Processing' },
      { from: 'Processing', to: 'Shipped', label: 'Shipped' },
      { from: 'Shipped', to: 'Delivered', label: 'Delivered' },
      { from: 'Delivered', to: '[*]' }
    ]
  }
};

// ============================================
// Example 5: ER Diagram
// ============================================

const erData = {
  type: 'erDiagram',
  title: 'Library Database Schema',
  content: {
    entities: [
      {
        name: 'BOOK',
        attributes: [
          { type: 'int', name: 'book_id', key: 'PK' },
          { type: 'string', name: 'title' },
          { type: 'string', name: 'isbn' },
          { type: 'int', name: 'published_year' }
        ]
      },
      {
        name: 'AUTHOR',
        attributes: [
          { type: 'int', name: 'author_id', key: 'PK' },
          { type: 'string', name: 'name' },
          { type: 'string', name: 'country' }
        ]
      },
      {
        name: 'BORROWER',
        attributes: [
          { type: 'int', name: 'borrower_id', key: 'PK' },
          { type: 'string', name: 'name' },
          { type: 'string', name: 'email' }
        ]
      },
      {
        name: 'LOAN',
        attributes: [
          { type: 'int', name: 'loan_id', key: 'PK' },
          { type: 'date', name: 'borrow_date' },
          { type: 'date', name: 'return_date' }
        ]
      }
    ],
    relationships: [
      { from: 'BOOK', to: 'AUTHOR', cardinality: '}|--|{', label: 'written_by' },
      { from: 'BOOK', to: 'LOAN', cardinality: '||--o{', label: 'borrowed_as' },
      { from: 'BORROWER', to: 'LOAN', cardinality: '||--o{', label: 'has' }
    ]
  }
};

// ============================================
// Example 6: Gantt Chart
// ============================================

const ganttData = {
  type: 'gantt',
  title: 'Website Redesign Project',
  dateFormat: 'YYYY-MM-DD',
  content: {
    title: 'Website Redesign Project',
    sections: [
      {
        name: 'Research & Planning',
        tasks: [
          { name: 'User Research', id: 'task1', start: '2024-01-01', duration: '7d' },
          { name: 'Competitor Analysis', id: 'task2', start: '2024-01-08', duration: '5d' },
          { name: 'Requirements Doc', id: 'task3', start: '2024-01-15', duration: '3d' }
        ]
      },
      {
        name: 'Design',
        tasks: [
          { name: 'Wireframes', id: 'task4', start: '2024-01-18', duration: '7d' },
          { name: 'UI Design', id: 'task5', start: '2024-01-25', duration: '10d' },
          { name: 'Design Review', id: 'task6', start: '2024-02-04', duration: '2d', status: 'milestone' }
        ]
      },
      {
        name: 'Development',
        tasks: [
          { name: 'Frontend', id: 'task7', start: '2024-02-06', duration: '14d' },
          { name: 'Backend API', id: 'task8', start: '2024-02-06', duration: '10d' },
          { name: 'Integration', id: 'task9', start: '2024-02-20', duration: '5d' }
        ]
      },
      {
        name: 'Testing & Launch',
        tasks: [
          { name: 'QA Testing', id: 'task10', start: '2024-02-25', duration: '5d' },
          { name: 'Bug Fixes', id: 'task11', start: '2024-03-01', duration: '3d' },
          { name: 'Launch', id: 'task12', start: '2024-03-04', duration: '1d', status: 'milestone' }
        ]
      }
    ]
  }
};

// ============================================
// Example 7: Pie Chart
// ============================================

const pieData = {
  type: 'pie',
  title: 'Monthly Budget Breakdown',
  content: {
    title: 'Monthly Budget Breakdown',
    data: [
      { label: 'Housing', value: 35 },
      { label: 'Food & Groceries', value: 20 },
      { label: 'Transportation', value: 15 },
      { label: 'Entertainment', value: 10 },
      { label: 'Savings', value: 12 },
      { label: 'Utilities', value: 8 }
    ]
  }
};

// ============================================
// Example 8: Mindmap
// ============================================

const mindmapData = {
  type: 'mindmap',
  title: 'Software Architecture',
  content: {
    root: {
      text: 'Software Architecture',
      children: [
        {
          text: 'Frontend',
          children: [
            { text: 'React Components' },
            { text: 'State Management' },
            { text: 'Styling (CSS/SCSS)' }
          ]
        },
        {
          text: 'Backend',
          children: [
            { text: 'API Layer' },
            { text: 'Business Logic' },
            { text: 'Data Access' }
          ]
        },
        {
          text: 'Database',
          children: [
            { text: 'PostgreSQL' },
            { text: 'Redis Cache' }
          ]
        },
        {
          text: 'DevOps',
          children: [
            { text: 'CI/CD Pipeline' },
            { text: 'Docker Containers' },
            { text: 'Kubernetes' }
          ]
        }
      ]
    }
  }
};

// ============================================
// Example 9: Raw Definition (Direct Mermaid Code)
// ============================================

const rawDefinition = {
  type: 'flowchart',
  title: 'Custom Diagram',
  definition: `flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#ff9,stroke:#333,stroke-width:2px`
};

// ============================================
// Usage Examples
// ============================================

console.log('=== Mermaid Diagram Creator Examples ===\n');

// Example: Create a flowchart diagram
try {
  const flowchartDiagram = MermaidDiagramCreator.createDiagram(flowchartData);
  console.log('1. Flowchart Diagram:');
  console.log(flowchartDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating flowchart:', error.message);
}

// Example: Create a sequence diagram
try {
  const sequenceDiagram = MermaidDiagramCreator.createDiagram(sequenceData);
  console.log('2. Sequence Diagram:');
  console.log(sequenceDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating sequence diagram:', error.message);
}

// Example: Create a class diagram
try {
  const classDiagram = MermaidDiagramCreator.createDiagram(classData);
  console.log('3. Class Diagram:');
  console.log(classDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating class diagram:', error.message);
}

// Example: Create a state diagram
try {
  const stateDiagram = MermaidDiagramCreator.createDiagram(stateData);
  console.log('4. State Diagram:');
  console.log(stateDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating state diagram:', error.message);
}

// Example: Create an ER diagram
try {
  const erDiagram = MermaidDiagramCreator.createDiagram(erData);
  console.log('5. ER Diagram:');
  console.log(erDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating ER diagram:', error.message);
}

// Example: Create a Gantt chart
try {
  const ganttDiagram = MermaidDiagramCreator.createDiagram(ganttData);
  console.log('6. Gantt Chart:');
  console.log(ganttDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating Gantt chart:', error.message);
}

// Example: Create a pie chart
try {
  const pieDiagram = MermaidDiagramCreator.createDiagram(pieData);
  console.log('7. Pie Chart:');
  console.log(pieDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating pie chart:', error.message);
}

// Example: Create a mindmap
try {
  const mindmapDiagram = MermaidDiagramCreator.createDiagram(mindmapData);
  console.log('8. Mindmap:');
  console.log(mindmapDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating mindmap:', error.message);
}

// Example: Create from raw definition
try {
  const rawDiagram = MermaidDiagramCreator.createDiagram(rawDefinition);
  console.log('9. Raw Definition:');
  console.log(rawDiagram.definition);
  console.log('\n---\n');
} catch (error) {
  console.error('Error creating raw diagram:', error.message);
}

// ============================================
// Browser Usage Example (for reference)
// ============================================

/*
// In browser environment with Mermaid.js loaded:

// 1. Create diagram from data
const diagram = MermaidDiagramCreator.createDiagram(flowchartData);

// 2. Render to a container
const container = document.getElementById('diagram-container');
await MermaidDiagramCreator.renderToContainer(diagram, container);

// 3. Download as PNG
await MermaidDiagramCreator.downloadAsPNG(diagram, 'my-flowchart.png', {
  scale: 2,
  backgroundColor: '#ffffff',
  padding: 20
});

// 4. Or get PNG blob for custom handling
const blob = await MermaidDiagramCreator.exportAsPNG(diagram, {
  scale: 3,
  backgroundColor: 'transparent'
});

// Upload to server, display in img tag, etc.
const imgUrl = URL.createObjectURL(blob);
document.getElementById('preview').src = imgUrl;
*/

// ============================================
// Export all examples for use in other modules
// ============================================

module.exports = {
  flowchartData,
  sequenceData,
  classData,
  stateData,
  erData,
  ganttData,
  pieData,
  mindmapData,
  rawDefinition
};