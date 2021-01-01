const blocksContainer = document.querySelector('.blocks')!;
const toggleButton = document.querySelector('#start')!;
let blocks: HTMLDivElement[] = [];
let running = false;

function setUp(): void {
  for (let i = 0; i < 25; i++) {
    const blockDiv = document.createElement('div');
    blockDiv.className = 'block';
    blockDiv.innerHTML = '0';
    blockDiv.style.backgroundColor = 'rgb(0, 0, 0)';
    blocks.push(blockDiv);
    blocksContainer.appendChild(blockDiv);
  }

  toggleButton.addEventListener('click', toggle);
  document.querySelector('#reset')!.addEventListener('click', reset);
}

function reset(): void {
  blocks = [];
  blocksContainer.innerHTML = '';
  setUp();
}

function delay(fn: (() => Promise<void>) | (() => void)): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await fn();
      resolve();
    }, 10);
  });
}

async function toggle(): Promise<void> {
  if (running) {
    toggleButton.innerHTML = 'Start';
  } else {
    toggleButton.innerHTML = 'Stop';
  }
  running = !running;
  while (running) {
    await delay(modifyRandomBlock);
  }
}

async function modifyRandomBlock(): Promise<void> {
  const index = Math.floor(Math.random() * blocks.length);
  const block = blocks[index];
  const mutator = Math.floor(Math.random() * 21) - 10;

  const currentNum = parseInt(block.innerHTML);
  const nextNum = currentNum + mutator;
  
  let backgroundColorStyle: string;
  if (nextNum < 0) {
    backgroundColorStyle = `rgb(0, 0, ${-3 * nextNum})`;
  } else if (nextNum > 0) {
    backgroundColorStyle = `rgb(${nextNum * 3}, 0, 0)`;
  } else {
    backgroundColorStyle = 'rgb(0, 0, 0)';
  }
  block.innerHTML = nextNum + '';
  block.style.backgroundColor = backgroundColorStyle;

  if (mutator < 0) {
    await bubbleUp(index);
  } else if (mutator > 0) {
    await bubbleDown(index);
  }
}

async function bubbleUp(index: number): Promise<void> {
  let i = index;
  const currentNum = parseInt(blocks[index].innerHTML);
  let keepBubbling = true;
  while (keepBubbling) {
    if (i === 0) {
      keepBubbling = false;
      break;
    }

    const otherNum = parseInt(blocks[i - 1].innerHTML);
    if (currentNum < otherNum) {
      await delay(() => {
        const temp = blocks[i - 1];
        blocks[i - 1] = blocks[i];
        blocks[i] = temp;
        blocksContainer.replaceChild(blocks[i], blocks[i - 1]);
        temp.before(blocks[i - 1]);
        i--;
      });
    } else {
      keepBubbling = false;
    }
  }
}

async function bubbleDown(index: number): Promise<void> {
  let i = index;
  const currentNum = parseInt(blocks[index].innerHTML);
  let keepBubbling = true;
  while (keepBubbling) {
    if (i === blocks.length - 1) {
      keepBubbling = false;
      break;
    }

    const otherNum = parseInt(blocks[i + 1].innerHTML);
    if (currentNum > otherNum) {
      await delay(() => {
        const temp = blocks[i + 1];
        blocks[i + 1] = blocks[i];
        blocks[i] = temp;
        blocksContainer.replaceChild(blocks[i], blocks[i + 1]);
        temp.after(blocks[i + 1]);
        i++;
      });
    } else {
      keepBubbling = false;
    }
  }
}

setUp();
