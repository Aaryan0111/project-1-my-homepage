/**
 * Project data for the work page.
 *
 * Each project is rendered twice from this one object: once as a "recipe"
 * (ingredients / method / yield) and once as a "spec" (a dense definition
 * list). Keeping the data here rather than in the markup means the two
 * presentations can never drift apart.
 */

export const projects = [
  {
    id: 'decormate-ar',
    title: 'Decormate AR',
    subtitle: 'Visualization app for multi-object interior decor',
    dates: 'Aug – Nov 2024',
    serves: 'shoppers placing furniture, decor and lab equipment in real rooms',
    role: 'Sole developer, six-person project team under faculty supervision',
    image: {
      src: 'images/decormate-unity-editor.jpg',
      alt:
        'The Decormate AR project open in the Unity editor, showing the AR scene ' +
        'hierarchy on the left and a 3D chair model positioned above a placement ' +
        'marker in the game view.',
      caption: 'Development view: the placement marker snapping to a detected plane.',
    },
    ingredients: [
      'C#',
      'Unity 2022.3',
      'AR Foundation',
      'Unity Addressables',
      'ARBaseGestureInteractable',
      'DOTween',
    ],
    method: [
      'Raycast from the centre of the screen against detected planes, and drive a crosshair to the hit pose so the user always sees where an object will land.',
      'Load the furniture catalogue asynchronously through Addressables, so the app does not carry every 3D model in its initial build.',
      'Parent each placed object to its own anchor rather than a shared root, which is what allows several objects to persist independently in one scene.',
      'Reject placements whose surface normal faces away from the camera, using a dot product against the hit pose, to stop objects appearing behind walls.',
      'Guard every placement tap with a UI raycast test, so tapping the catalogue never drops furniture into the room by accident.',
    ],
    yield: [
      { label: 'Copyright SW-20059/2025', detail: 'Registered with the Government of India, 8 Jan 2025' },
      { label: '60+ fps on device', detail: 'Sustained with multiple models placed' },
      { label: 'Multi-object placement', detail: 'Independent anchors per object' },
    ],
    spec: [
      ['Role', 'Sole developer; copyright registered to the six-person project team including the faculty supervisor'],
      ['Duration', 'August to November 2024'],
      ['Platform', 'Android, Unity 2022.3, AR Foundation'],
      ['Language', 'C#'],
      ['Asset loading', 'Unity Addressables, async catalogue fetch by label'],
      ['Placement', 'ARRaycastManager against PlaneWithinPolygon; per-object PlacementAnchor'],
      ['Interaction', 'ARBaseGestureInteractable subclass; tap-to-place with UI raycast guard'],
      ['Outcome', 'Copyright registration SW-20059/2025, diary number 36000/2024-CO/SW'],
    ],
    links: [],
  },
  {
    id: 'respiratory-cnn',
    title: 'Respiratory disease detection',
    subtitle: 'Chest X-ray classification with a ResNet-based CNN',
    dates: 'Feb – Apr 2025',
    serves: 'clinicians triaging chest X-rays where a radiologist is not on hand',
    role: 'Research project, published at MULTINOVA ICAIEHS-2025',
    image: null,
    ingredients: ['Python', 'ResNet', 'Deep learning', 'Medical imaging datasets'],
    method: [
      'Assemble and clean chest X-ray datasets covering pneumonia, tuberculosis and COVID-19.',
      'Build a preprocessing and augmentation pipeline so the model generalises across images from different machines and hospitals.',
      'Train a ResNet-based classifier and validate it against held-out data.',
      'Evaluate on accuracy, precision, recall and F1 rather than accuracy alone, because class imbalance makes accuracy misleading here.',
    ],
    yield: [
      { label: 'Published, ICAIEHS-2025', detail: 'DOI 10.2991/978-94-6463-852-3_19' },
      { label: 'Three-class classifier', detail: 'Pneumonia, tuberculosis, COVID-19' },
    ],
    spec: [
      ['Role', 'Research and implementation'],
      ['Duration', 'February to April 2025'],
      ['Architecture', 'Convolutional neural network, ResNet backbone'],
      ['Language', 'Python'],
      ['Task', 'Three-class classification from chest radiographs'],
      ['Evaluation', 'Accuracy, precision, recall, F1'],
      ['Outcome', 'Peer-reviewed publication at MULTINOVA ICAIEHS-2025'],
    ],
    links: [
      {
        label: 'Read the paper',
        href: 'https://doi.org/10.2991/978-94-6463-852-3_19',
      },
    ],
  },
];
