import * as Demos from './demo/index'

function setupCanvas() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) {
    throw new Error('canvas not found')
  }
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('canvas rendering context not found')
  }

  return {
    canvas,
    context,
  }
}

function setupDemos() {
  const { canvas, context } = setupCanvas()
  const selectElement = document.getElementById(
    'demo-select'
  ) as HTMLSelectElement
  const demoNames = Object.keys(Demos)
  demoNames.forEach((name) => {
    const optionElement = document.createElement('option')
    optionElement.value = name
    optionElement.text = name
    selectElement.appendChild(optionElement)
  })

  const showDemo = () => {
    const demo = Demos[selectElement.value as keyof typeof Demos]
    if (typeof demo !== 'function') {
      alert(`demo ${selectElement.value} not found`)
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    demo(context)
  }

  showDemo()
  selectElement.addEventListener('change', () => {
    showDemo()
  })
}

setupDemos()
