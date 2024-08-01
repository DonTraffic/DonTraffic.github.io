<template>
  <div class="card card--position-left card-skills" id="cardSkills">
    <div 
      class="card__content card-skills__content"
      v-if="scrollStatus[0]"
    >
      <p class="card-skills__content-quote text-shadow">
        Аналогично тому, как написание картины является искусством для души, 
        так и написание программы является искусством для разума.
        <i class="card-skills__content-quote-author">- Volnik -</i>
      </p>
    </div>

    <div class="card__background card__background--index-top card-skills__background">
      <canvas 
        class="card-skills__background-sea" 
        id="canvas-sea"

        @mousemove="handleMouseMove"
        @wheel="(e) => changeScrollPosition(e.deltaY > 0 ? true : false)"
        @click="(e) => handlerClick(e)"
      ></canvas>

      <div class="card-skills__background-sea card-skills__background-sea--mobile">
        <div class="sea__sun icon-sun"></div>

        <div class="sea">
          <div class="sea__wave sea__wave-16">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-15">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-14">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-13">
            <div class="sea__wave-block sea__wave-block--95" @click="scrollActive=-2, openDialog('NUXT')">NUXT</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-12">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-11">
            <div class="sea__wave-block sea__wave-block--70" @click="scrollActive=-2, openDialog('VUE')">VUE</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-10">
            <div class="sea__wave-block sea__wave-block--45" @click="scrollActive=-2, openDialog('Canvas')">Canvas</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-9">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-8">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-7">
            <div class="sea__wave-block sea__wave-block--85" @click="scrollActive=-1, openDialog('jQuery')">jQuery</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-6">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-5">
            <div class="sea__wave-block sea__wave-block--65" @click="scrollActive=-1, openDialog('JavaScript')">JS</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-4">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-3">
            <div class="sea__wave-block sea__wave-block--95" @click="scrollActive=-1, openDialog('CSS')">CSS</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-2">
            <div class="sea__wave-block sea__wave-block--50" @click="scrollActive=-1, openDialog('HTML')">HTML</div>
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>

          <div class="sea__wave sea__wave-1">
            <img src="@/assets/svg/wave.svg" alt="sea-wave">
          </div>
        </div>
      </div>
    </div>

    <modals-modalSkill
      :activeSkill="activeSkill"
      :info="infoSkills[-scrollActive]"
      @closeModal="closeModal"
    />

    <modules-controller
      parentId="cardSkills"
      :controllerHide="controllerHide"
      :controllers="{ 
        right: 'cardMenu' 
      }"
    />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

// глобальные переменные и функции
const store = useStore()

// определение размеров
const globalSize = ref(false)
const updateSize = () => {
  if (process.client) globalSize.value = window.innerWidth > 425
}

// блоки навыков
const handlerClick = (e) => {
  for (const key in infoSkills[-scrollActive]) {
    let item = infoSkills[-scrollActive][key]

    let coordX = (item.position.x < 0 ? canvasWidth + item.position.x : item.position.x) + 
      -parallaxMoveX/4
    let coordY = (item.position.y < 0 ? canvasHeight + item.position.y : item.position.y) + 
      -parallaxMoveY/4 + (canvasHeight * (-scrollActive)) + animationMoveY
    let textWidth = context.value.measureText(item.skill).width + 10

    if(
      coordX - blocksRadius < e.offsetX && e.offsetX < coordX + textWidth + blocksRadius && 
      coordY - blocksRadius < e.offsetY && e.offsetY < coordY + blocksHeight + blocksRadius
    ) openDialog(key)
  }
}

const handleMouseMove = (e) => {
  const rect = canvas.value.getBoundingClientRect();
  mouseMoveX = e.clientX - rect.left;
  mouseMoveY = e.clientY - rect.top;
};

// создание рандом. числа
const randomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

// модальное окно
const openDialog = (language) => {
  activeSkill.value = language
  controllerHide.value = true
}

const closeModal = () => {
  activeSkill.value = ''
  controllerHide.value = false
}



// настройки и хранилища
// канвас
const canvas = ref(null)
  let canvasHeight = 0
  let canvasWidth = 0
const context = ref(null)

// значения для print mouse
let wheelStatus = 1
let wheelMove = 1

// значения анимации slider move
const scrollCountMax = 3
  let scrollActive = 0
const scrollStatus = reactive({ 0: true })
const animationMoveSpeed = 8
  let handleScrollStatus = true
  let animationMoveY = 0 // -450
  let animationMoveDirection = 0

// глобальное положение курсора
let mouseMoveX = 0
let mouseMoveY = 0

// значения параллакса
const parralaxSpeed = 15
  let parallaxMoveX = 0
  let parallaxMoveY = 0

// значения волн
const waveLenght = 150
const offsetLeft = 300
const waveMaxHeight = 4
  let waveOffsetHeightTop = 0
const offsetHeight = 10
const waveCount = 13
const wavePossition = [0, 0, 51, 154, 0]

// значения блик
const blickCount = 20
const blickLimit = 20
const blicksInfo = {}

// значения для блоков скиллов
const blocksHeight = 30
const blocksRadius = 10
  let activeSkill = ref('')
  let controllerHide = ref(false)
const infoSkills = {
  1: {
    HTML: {
      experience: 'Больше 3х лет',
      example: '',

      courses: {
        0: {
          title: '«Профессиональная вёрстка»',
          url: 'https://gb.ru/certificates/1093227'
        }
      },
      tests: {
        0: {
          title: '«HTML&CSS. Сложный уровень»',
          url: 'https://gb.ru/go/VNNXB05'
        },
      },
      recommendations: {
        0: {
          title: 'Компания «xseven»',
          url: '/files/xseven.pdf'
        }
      },

      position: {
        x: -150,
        y: -150,
      },
      color: 15,
    },

    CSS: {
      experience: 'Больше 3х лет',
      example: '',

      courses: {
        0: {
          title: '«Профессиональная вёрстка»',
          url: 'https://gb.ru/certificates/1093227'
        }
      },
      tests: {
        0: {
          title: '«HTML&CSS. Сложный уровень»',
          url: 'https://gb.ru/go/VNNXB05'
        },
      },
      recommendations: {
        0: {
          title: 'Компания «xseven»',
          url: '/files/xseven.pdf'
        }
      },

      position: {
        x: 150,
        y: -100,
      },
      color: 15,
    },

    jQuery: {
      experience: 'Больше 1 года',
      example: '',

      // courses: {
      //   0: {
      //     title: '«Профессиональная вёрстка»',
      //     url: 'https://gb.ru/certificates/1093227'
      //   }
      // },
      // tests: {
      //   0: {
      //     title: '«HTML&CSS. Сложный уровень»',
      //     url: 'https://gb.ru/go/VNNXB05'
      //   },
      // },
      recommendations: {
        0: {
          title: 'Компания «xseven»',
          url: '/files/xseven.pdf'
        }
      },

      position: {
        x: -250,
        y: 175,
      },
      color: 15,
    },

    JavaScript: {
      experience: 'Больше 2х лет',
      example: 'https://dontraffic.ru/market',

      courses: {
        0: {
          title: '«Продвинутый курс JavaScript»',
          url: 'https://gb.ru/certificates/2183847?7d5959fd53c11adb9fc8ab88269d3ea3'
        },
        1: {
          title: '«Профессиональная вёрстка»',
          url: 'https://gb.ru/certificates/1093227?26800bfbac76f0865cff8b768767d415'
        },
      },
      tests: {
        0: {
          title: '«JavaScript. Сложный уровень»',
          url: 'https://gb.ru/certificates/2185392?13da3644a25fd7f9af1bbe9255e31af5'
        },
      },
      recommendations: {
        0: {
          title: 'Компания «xseven»',
          url: '/files/xseven.pdf'
        }
      },

      position: {
        x: 100,
        y: 100,
      },
      color: 15,
    },
  },

  2: {
    Canvas: {
      experience: 'Больше 3х лет',
      example: '',

      // courses: {
      //   0: {
      //     title: '«Профессиональная вёрстка»',
      //     url: 'https://gb.ru/certificates/1093227'
      //   }
      // },
      // tests: {
      //   0: {
      //     title: '«HTML&CSS. Сложный уровень»',
      //     url: 'https://gb.ru/go/VNNXB05'
      //   },
      // },
      recommendations: {
        0: {
          title: 'Этот сайт',
          url: '#'
        }
      },

      position: {
        x: 150,
        y: -100,
      },
      color: 15,
    },

    VUE: {
      experience: 'Больше 1 года',
      example: '',

      // courses: {
      //   0: {
      //     title: '«Профессиональная вёрстка»',
      //     url: 'https://gb.ru/certificates/1093227'
      //   }
      // },
      // tests: {
      //   0: {
      //     title: '«HTML&CSS. Сложный уровень»',
      //     url: 'https://gb.ru/go/VNNXB05'
      //   },
      // },
      recommendations: {
        0: {
          title: 'Компания «xseven»',
          url: '/files/xseven.pdf'
        }
      },

      position: {
        x: -150,
        y: 175,
      },
      color: 15,
    },

    NUXT: {
      experience: 'Больше 2х лет',
      example: 'https://dontraffic.ru/market',

      // courses: {
      //   0: {
      //     title: '«Продвинутый курс JavaScript»',
      //     url: 'https://gb.ru/certificates/2183847?7d5959fd53c11adb9fc8ab88269d3ea3'
      //   },
      //   1: {
      //     title: '«Профессиональная вёрстка»',
      //     url: 'https://gb.ru/certificates/1093227?26800bfbac76f0865cff8b768767d415'
      //   },
      // },
      // tests: {
      //   0: {
      //     title: '«JavaScript. Сложный уровень»',
      //     url: 'https://gb.ru/certificates/2185392?13da3644a25fd7f9af1bbe9255e31af5'
      //   },
      // },
      recommendations: {
        0: {
          title: 'Компания «xseven»',
          url: '/files/xseven.pdf'
        }
      },

      position: {
        x: 200,
        y: 100,
      },
      color: 15,
    },
  }
}

// значения для скалы
const rockSeaweeds = {
  0: {
    slide: 1,

    position: {
      x: 60,
      y: 65
    },

    seaweeds: {
      0: {
        height: 43,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 7,
        rotateMax: 10,
        rotateDirection: true,
      },

      1: {
        height: 48,
      
        deviation: 3,
        deviationMax: 4,
        deviationDirection: true,

        rotate: 0,
        rotateMax: 10,
        rotateDirection: false,
      },

      2: {
        height: 53,
      
        deviation: 0,
        deviationMax: 4,
        deviationDirection: true,

        rotate: 0,
        rotateMax: 10,
        rotateDirection: false,
      },

      3: {
        height: 55,
      
        deviation: 3,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 2,
        rotateMax: 10,
        rotateDirection: true,
      },

      4: {
        height: 64,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 2,
        rotateMax: 10,
        rotateDirection: false,
      },

      5: {
        height: 58,
      
        deviation: 2,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 7,
        rotateMax: 10,
        rotateDirection: false,
      },

      6: {
        height: 48,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 9,
        rotateMax: 10,
        rotateDirection: false,
      },
    }
  },

  1: {
    slide: 2,

    position: {
      x: 103,
      y: 235
    },

    seaweeds: {
      0: {
        height: 43,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 4,
        rotateMax: 10,
        rotateDirection: true,
      },

      1: {
        height: 48,
      
        deviation: 0,
        deviationMax: 4,
        deviationDirection: true,

        rotate: 3,
        rotateMax: 10,
        rotateDirection: false,
      },

      2: {
        height: 53,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: true,

        rotate: 1,
        rotateMax: 10,
        rotateDirection: false,
      },

      3: {
        height: 55,
      
        deviation: 3,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 2,
        rotateMax: 10,
        rotateDirection: true,
      },

      4: {
        height: 64,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 5,
        rotateMax: 10,
        rotateDirection: false,
      },

      5: {
        height: 58,
      
        deviation: 3,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 7,
        rotateMax: 10,
        rotateDirection: false,
      },

      6: {
        height: 48,
      
        deviation: 2,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 1,
        rotateMax: 10,
        rotateDirection: false,
      },
    }
  }
}

const rockSeaweedsInside = {
  0: {
    slide: 2,

    position: {
      x: 30,
      y: 500
    },

    seaweeds: {
      0: {
        height: 43,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 7,
        rotateMax: 10,
        rotateDirection: true,
      },

      1: {
        height: 48,
      
        deviation: 3,
        deviationMax: 4,
        deviationDirection: true,

        rotate: 0,
        rotateMax: 10,
        rotateDirection: false,
      },

      2: {
        height: 53,
      
        deviation: 0,
        deviationMax: 4,
        deviationDirection: true,

        rotate: 0,
        rotateMax: 10,
        rotateDirection: false,
      },

      3: {
        height: 55,
      
        deviation: 3,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 2,
        rotateMax: 10,
        rotateDirection: true,
      },

      4: {
        height: 64,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 2,
        rotateMax: 10,
        rotateDirection: false,
      },

      5: {
        height: 58,
      
        deviation: 2,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 7,
        rotateMax: 10,
        rotateDirection: false,
      },

      6: {
        height: 48,
      
        deviation: 1,
        deviationMax: 4,
        deviationDirection: false,

        rotate: 9,
        rotateMax: 10,
        rotateDirection: false,
      },
    }
  },
}

// значения для рыб
const infoFishs = {
  1: {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
  },
  2: {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
  }
}



// инициализация канваса
const canvasInit = () => {
  canvas.value = document.getElementById('canvas-sea');

  if(globalSize.value) {
    let cardElem = document.querySelector('.card')

    // обьявляем канвас
    context.value = canvas.value.getContext('2d');

    // настраиваем размеры canvas относительно глобальных размеров
    canvasWidth = globalSize.value ? cardElem.offsetWidth : window.innerWidth ;
      canvas.value.width = canvasWidth
    canvasHeight = globalSize.value ? cardElem.offsetHeight : window.innerHeight ;
      canvas.value.height = canvasHeight

    // задаём динамический отступ волн от верха
    waveOffsetHeightTop = cardElem.offsetHeight/2

    // задаём общий цвет
    context.value.fillStyle = "rgb(15, 15, 15)";
    context.value.strokeStyle = "rgb(235, 235, 235)";
    context.value.lineWidth = 1;
    context.value.shadowColor = "rgb(235, 235, 235)";

    // создаём значения для рыбы
    for (const slide in infoFishs) {
      for (const fish in infoFishs[slide]) { generateFish(slide, fish, true) }
    }

    // запускаем анимацию
    requestAnimationFrame(tick)
  } else {
    canvas.value.remove()
  }
}

// 
const changeScrollPosition = (direction) => {
  if (!handleScrollStatus) return
    handleScrollStatus = false
    setTimeout(() => { 
      handleScrollStatus = true;

      for (const key in scrollStatus) {
        scrollStatus[key] = false
      }
      scrollStatus[-scrollActive] = true
    }, 1000);

    if (!direction && scrollActive == 0) return
      if (!direction) {
        scrollActive++
        animationMoveDirection++
      } else {
        scrollActive--
        animationMoveDirection--
      }
      scrollStatus[-scrollActive] = true

    if (scrollActive <= -scrollCountMax) {
      scrollActive++
      animationMoveDirection++
    }
}

const printSun = ()=> {
  context.value.fillStyle = "rgb(235, 235, 235)";
  context.value.shadowBlur = 50

  context.value.beginPath()
    context.value.arc(
      document.querySelector('.card').offsetWidth - 145 - parallaxMoveX/7, 
      145 - parallaxMoveY/7,

      100, 0, Math.PI*2,

      true
    );
  context.value.closePath()
  context.value.stroke()
  context.value.fill()

  context.value.fillStyle = "rgb(15, 15, 15)";
  context.value.shadowBlur = 0
}

const printWave = () => {
  context.value.shadowBlur = 10
  // context.value.setLineDash([40, 70])

  for (let i = 1; i < wavePossition.length; i++) {
    wavePossition[i]+= .15 + (.1*i)

    let parallaxX = -parallaxMoveX * (i/3)
    let parallaxY = -parallaxMoveY * (i/3)

    context.value.beginPath()

    context.value.moveTo(
      (waveLenght * 0) - offsetLeft + parallaxX + wavePossition[i], 
      waveOffsetHeightTop + (offsetHeight*i) + parallaxY + animationMoveY
    )

    for (let wave = 0; wave < waveCount; wave++) {  

      let firstCoord = ((waveLenght * wave)) - offsetLeft + parallaxX
      let secondCoord = ((waveLenght * wave) + waveLenght/2) - offsetLeft + parallaxX
      let thirdCoord = ((waveLenght * wave) + waveLenght) - offsetLeft + parallaxX

      if (firstCoord + wavePossition[i] > (waveLenght*waveCount) - offsetLeft) wavePossition[i]-= waveLenght*2

      context.value.bezierCurveTo(
        firstCoord + wavePossition[i], 
        waveOffsetHeightTop + (offsetHeight*i) + parallaxY + animationMoveY,

        secondCoord + wavePossition[i], 
        waveOffsetHeightTop + (offsetHeight*i) + parallaxY + animationMoveY + (wave%2 ? waveMaxHeight + 6*i : -waveMaxHeight - 6*i),

        thirdCoord + wavePossition[i], 
        waveOffsetHeightTop + (offsetHeight*i) + parallaxY + animationMoveY
      );
    }

    // Закрываем волну
    context.value.lineTo((waveLenght * waveCount) - waveLenght + wavePossition[i] + parallaxX, canvasHeight + 10)
    context.value.lineTo(wavePossition[i] - waveLenght + parallaxX, canvasHeight + 10)

    // закрашиваем волну
    context.value.closePath()
    context.value.stroke()
    context.value.fill()
  }

  context.value.shadowBlur = 0;
}

const generateFish = (slide, fish, first) => {
  infoFishs[slide][fish] = {
    speed:  randomInteger(50, 200),
    size:  randomInteger(0, 8),
    direction: Boolean(randomInteger(0, 1)),
  }
  infoFishs[slide][fish].position = {
    x: first ? 
      randomInteger(0, canvasWidth) : 
      infoFishs[slide][fish].direction ? -100 : canvasWidth,
    y: (canvasHeight * slide) + randomInteger(50, canvasHeight-50),
  }
}

const printFish = (slide, key) => {
  let fish = infoFishs[slide][key]
  let positionY = animationMoveY + fish.position.y - parallaxMoveY/2
  let positionX = fish.position.x - parallaxMoveX/2
  let size = fish.size
  let speed = fish.speed/100
  let direction = fish.direction

  if (direction) {
    fish.position.x > canvasWidth + 50 ? generateFish(slide, key, false) : fish.position.x+= speed

    context.value.beginPath();
      // туловище
      context.value.moveTo(
        positionX - size, 
        positionY
      );
        context.value.bezierCurveTo(
          positionX - 5 - size, 
          positionY - 15 + size,

          positionX - 35 + size, 
          positionY - 15 + size,

          positionX - 50 + size, 
          positionY,
        );
        context.value.bezierCurveTo(
          positionX - 35 + size, 
          positionY + 15 - size,

          positionX - 5, 
          positionY + 15 - size,

          positionX - size, 
          positionY,
        );
      context.value.fill()

      // хвост
      context.value.moveTo(
        positionX - 50 + size, 
        positionY
      );
        context.value.bezierCurveTo(
          positionX - 65 + size, 
          positionY - 15 + size,

          positionX - 70 + size, 
          positionY - 15 + size,

          positionX - 60 + size, 
          positionY,
        );
        context.value.bezierCurveTo(
          positionX - 70 + size, 
          positionY + 15 - size,

          positionX - 65 + size, 
          positionY + 15 - size,

          positionX - 50 + size, 
          positionY,
        );
      context.value.fill()

      // глаз
      context.value.moveTo(
        positionX - 13 + 3 - size/4, 
        positionY - 3 + size/4
      );
      context.value.arc(
        positionX - 13 - size/4, 
        positionY - 3 + size/4,

        3 - Number('0.' + size), 0, Math.PI*2,

        true
      );

      // жабры
      context.value.moveTo(
        positionX - 22, 
        positionY - 6 + size/3
      );
      context.value.bezierCurveTo(
        positionX - 25, 
        positionY - 2,

        positionX - 25, 
        positionY + 2,

        positionX - 22, 
        positionY + 6 - size/3,
      );

      // плавник (верхний)
      context.value.moveTo(
        positionX - 18, 
        positionY - 12 + size
      );
      context.value.bezierCurveTo(
        positionX - 24, 
        positionY - 20 + size,

        positionX - 24, 
        positionY - 20 + size,

        positionX - 25, 
        positionY - 12 + size,
      );

      // плавник (нижний)
      context.value.moveTo(
        positionX - 28, 
        positionY + 10 - size/1.5
      );
      context.value.bezierCurveTo(
        positionX - 36, 
        positionY + 18 - size/1.5,

        positionX - 36, 
        positionY + 18 - size/1.5,

        positionX - 35, 
        positionY + 8 - size/1.5,
      );

    context.value.stroke()
  } else {
    fish.position.x < -50 ? generateFish(slide, key, false) : fish.position.x-= speed

    context.value.beginPath();
      // туловище
      context.value.moveTo(
        positionX + size, 
        positionY
      );
        context.value.bezierCurveTo(
          positionX + 5 + size, 
          positionY - 15 + size,

          positionX + 35 - size, 
          positionY - 15 + size,

          positionX + 50 - size, 
          positionY,
        );
        context.value.bezierCurveTo(
          positionX + 35 - size, 
          positionY + 15 - size,

          positionX + 5, 
          positionY + 15 - size,

          positionX + size, 
          positionY,
        );
      context.value.fill()

      // хвост
      context.value.moveTo(
        positionX + 50 - size, 
        positionY
      );
        context.value.bezierCurveTo(
          positionX + 65 - size, 
          positionY - 15 + size,

          positionX + 70 - size, 
          positionY - 15 + size,

          positionX + 60 - size, 
          positionY,
        );
        context.value.bezierCurveTo(
          positionX + 70 - size, 
          positionY + 15 - size,

          positionX + 65 - size, 
          positionY + 15 - size,

          positionX + 50 - size, 
          positionY,
        );
      context.value.fill()

      // глаз
      context.value.moveTo(
        positionX + 13 + 3 + size/4, 
        positionY - 3 + size/4
      );
      context.value.arc(
        positionX + 13 + size/4, 
        positionY - 3 + size/4,

        3 - Number('0.' + size), 0, Math.PI*2,

        true
      );

      // жабры
      context.value.moveTo(
        positionX + 22, 
        positionY - 6 + size/3
      );
      context.value.bezierCurveTo(
        positionX + 25, 
        positionY - 2,

        positionX + 25, 
        positionY + 2,

        positionX + 22, 
        positionY + 6 - size/3,
      );

      // плавник (верхний)
      context.value.moveTo(
        positionX + 18, 
        positionY - 12 + size
      );
      context.value.bezierCurveTo(
        positionX + 24, 
        positionY - 20 + size,

        positionX + 24, 
        positionY - 20 + size,

        positionX + 25, 
        positionY - 12 + size,
      );

      // плавник (нижний)
      context.value.moveTo(
        positionX + 28, 
        positionY + 10 - size/1.5
      );
      context.value.bezierCurveTo(
        positionX + 36, 
        positionY + 18 - size/1.5,

        positionX + 36, 
        positionY + 18 - size/1.5,

        positionX + 35, 
        positionY + 8 - size/1.5,
      );

    context.value.stroke()
  }
}

const blickCreate = (slide, key, blickStart) => {
  let blick = blicksInfo[slide]

  blick[key] = {}
  blick[key].width = randomInteger(0, canvasWidth)
  blick[key].height = slide == 0 ? 
    randomInteger(blickStart, canvasHeight) : 
    randomInteger(blickStart, blickStart + canvasHeight)
  blick[key].offset = randomInteger(0, 40)
  blick[key].anim = 0
}

const printBlick = (slide) => {
  let blickStart = slide == 0 ? (canvasHeight/4.8)*3 : canvasHeight*slide ;

  for (let blick = 0; blick < blickCount; blick++) {
    if (!blicksInfo[slide]) blicksInfo[slide] = {}
    if (!blicksInfo[slide][blick]) blickCreate(slide, blick, blickStart)

    let infoBlick = blicksInfo[slide][blick]

    if (infoBlick.offset !=0) {
      infoBlick.offset--
      continue
    }

    infoBlick.anim += .6
      if (infoBlick.anim > blickLimit*2) blickCreate(slide, blick, blickStart)
    let blickHeight = infoBlick.height - parallaxMoveY + animationMoveY
    let blickWidth = infoBlick.width - parallaxMoveX

    context.value.beginPath();
      context.value.moveTo(
        blickWidth + (infoBlick.anim >= blickLimit ? infoBlick.anim - blickLimit : 0), 
        blickHeight
      );
      context.value.lineTo(
        blickWidth + (infoBlick.anim >= blickLimit ? blickLimit : infoBlick.anim), 
        blickHeight
      )
    context.value.stroke()
  }
}

const printMouse = () => {
  switch (wheelStatus) {
    case 1:
      wheelMove+= .5
      if (wheelMove >= 10) wheelStatus = 2
    break;

    case 2:
      wheelMove-= .20
      if (wheelMove <= 0) wheelStatus = 3
    break;

    case 3:
    wheelStatus = 0
      setTimeout(() => {wheelStatus = 1}, 2000)
    break;
  }

  context.value.beginPath()
    context.value.arc(
      document.querySelector('.card').offsetWidth/2, 
      document.querySelector('.card').offsetHeight - 45 + animationMoveY,

      10, 0, Math.PI,

      true
    );
    context.value.arc(
      document.querySelector('.card').offsetWidth/2, 
      document.querySelector('.card').offsetHeight - 30 + animationMoveY,

      10, Math.PI, 0, 

      true
    );
  context.value.closePath()
  context.value.stroke()
  context.value.fill()

  context.value.beginPath()
    context.value.arc(
      document.querySelector('.card').offsetWidth/2, 
      document.querySelector('.card').offsetHeight - 45 + wheelMove + animationMoveY,

      1, 0, Math.PI,

      true
    );
    context.value.arc(
      document.querySelector('.card').offsetWidth/2, 
      document.querySelector('.card').offsetHeight - 40 + wheelMove + animationMoveY,

      1, Math.PI, 0, 

      true
    );
  context.value.closePath()
  context.value.stroke()
}

const printBlock = (slide, key) => {
  let item = infoSkills[slide][key]
  let parallaxX = -parallaxMoveX/4
  let parallaxY = -parallaxMoveY/4

  // задаём переменные
  let coordX = (item.position.x < 0 ? canvasWidth + item.position.x : item.position.x) + 
    parallaxX
  let coordY = (item.position.y < 0 ? canvasHeight + item.position.y : item.position.y) + 
    parallaxY + (canvasHeight*slide) + animationMoveY
  let textWidth = context.value.measureText(key).width + blocksRadius

  // следим когда курсор будет над блоком текста
  if(
    coordX - blocksRadius < mouseMoveX && mouseMoveX < coordX + textWidth + blocksRadius && 
    coordY - blocksRadius < mouseMoveY && mouseMoveY < coordY + blocksHeight + blocksRadius
  ) {
    if (item.color < 235) item.color+=5
  } else {
    if (item.color > 15) item.color-=5
  }
  context.value.fillStyle = `rgba(${item.color}, ${item.color}, ${item.color}`

  // рисуем блок текста
  context.value.beginPath()
    context.value.arc(
      coordX, coordY,
      blocksRadius, Math.PI, -Math.PI/2,
      false
    )
    context.value.lineTo(coordX, coordY - blocksRadius)
    context.value.arc(
      coordX + textWidth , coordY,
      blocksRadius, -Math.PI/2, Math.PI/2 - Math.PI/2,
      false
    )
    context.value.lineTo(coordX + textWidth + blocksRadius, coordY + blocksHeight)
    context.value.arc(
      coordX + textWidth , coordY + blocksHeight,
      blocksRadius, Math.PI*2, Math.PI/2,
      false
    )
    context.value.lineTo(coordX + textWidth , coordY + blocksHeight + blocksRadius)
    context.value.arc(
      coordX, coordY + blocksHeight,
      blocksRadius, Math.PI/2, Math.PI/2 + Math.PI/2,
      false
    )
    context.value.lineTo(coordX - blocksRadius, coordY)
  context.value.closePath()
  context.value.fill()

  // пишем текст
  context.value.fillStyle = `rgba(${235 - item.color}, ${235 - item.color}, ${235 - item.color}`;
  context.value.font = '24px Open Sans';
  context.value.textAlign = 'center';
  context.value.fillText(
    key, 
    coordX + textWidth/2, 
    coordY + blocksHeight/2 + blocksRadius
  );

  context.value.fillStyle = "rgb(15, 15, 15)";
  context.value.stroke()
}

const printRockSeaweed = (context, movePositionX, movePositionY, data) => {
  if ( !scrollStatus[data.slide] ) return

  let positionX = movePositionX + data.position.x
  let positionY = movePositionY + data.position.y

  for (const key in data.seaweeds) {
    let seaweed = data.seaweeds[key]
    let deviation = seaweed.deviation
    let rotate = seaweed.rotate
    let heightSeaweed = seaweed.height/6

    positionX+= Number(key)/2

    if (deviation <= -seaweed.deviationMax || deviation >= seaweed.deviationMax) 
      seaweed.deviationDirection = !seaweed.deviationDirection
    seaweed.deviationDirection ? seaweed.deviation+=.02 : seaweed.deviation-=.02

    if (rotate <= -seaweed.rotateMax || rotate >= seaweed.rotateMax) 
      seaweed.rotateDirection = !seaweed.rotateDirection
    seaweed.rotateDirection ? seaweed.rotate+=.02 : seaweed.rotate-=.02

    context.value.beginPath()
      context.value.moveTo(positionX, positionY)
      context.value.bezierCurveTo(
        positionX+rotate/6, positionY-heightSeaweed*1, 
        positionX+deviation+rotate/5, positionY-heightSeaweed*2, 
        positionX+rotate/4, positionY-heightSeaweed*3
      )
      context.value.bezierCurveTo(
        positionX-deviation+rotate/3, positionY-heightSeaweed*4, 
        positionX-deviation+rotate/2, positionY-heightSeaweed*5, 
        positionX+rotate/1, positionY-heightSeaweed*6
      )
    context.value.stroke();
    context.value.closePath()
  }
}

const printRock = () => {
  let movePositionX = -10 + (-parallaxMoveX/8)
  let movePositionY = canvasHeight - 50 + animationMoveY + (canvasHeight/4)*3 + (-parallaxMoveY/8)

  // водоросли
  for (const key in rockSeaweeds) { printRockSeaweed(context, movePositionX, movePositionY, rockSeaweeds[key]) }

  // контур скалы
  context.value.beginPath()
    context.value.moveTo(movePositionX+43, movePositionY+11)
    context.value.bezierCurveTo(
      movePositionX+36, movePositionY+3, 
      movePositionX+19, movePositionY+0, 
      movePositionX+1, movePositionY+0
    )
    context.value.lineTo(1, movePositionY+733)
    context.value.bezierCurveTo(
      movePositionX+37, movePositionY+715, 
      movePositionX+46, movePositionY+669, 
      movePositionX+46, movePositionY+648
    )
    context.value.bezierCurveTo(
      movePositionX+80, movePositionY+589, 
      movePositionX+85, movePositionY+481, 
      movePositionX+82, movePositionY+430
    )
    context.value.bezierCurveTo(
      movePositionX+95, movePositionY+399, 
      movePositionX+103, movePositionY+359, 
      movePositionX+108, movePositionY+322
    )
    context.value.bezierCurveTo(
      movePositionX+112, movePositionY+287, 
      movePositionX+114, movePositionY+254, 
      movePositionX+114, movePositionY+233
    )
    context.value.bezierCurveTo(
      movePositionX+103, movePositionY+235, 
      movePositionX+84, movePositionY+221, 
      movePositionX+88, movePositionY+152
    )
    context.value.bezierCurveTo(
      movePositionX+91, movePositionY+83, 
      movePositionX+77, movePositionY+65, 
      movePositionX+70, movePositionY+65
    )
    context.value.bezierCurveTo(
      movePositionX+67, movePositionY+66, 
      movePositionX+63, movePositionY+65, 
      movePositionX+59, movePositionY+63
    )
    context.value.bezierCurveTo(
      movePositionX+53, movePositionY+59, 
      movePositionX+48, movePositionY+50, 
      movePositionX+49, movePositionY+31
    )
    context.value.bezierCurveTo(
      movePositionX+49, movePositionY+22, 
      movePositionX+47, movePositionY+15, 
      movePositionX+43, movePositionY+11
    )
  context.value.closePath();
  context.value.fill();
  context.value.stroke();

  // внутренности скалы
  context.value.moveTo(movePositionX+20, movePositionY+40)
  context.value.lineTo(movePositionX+25, movePositionY+65)
  context.value.lineTo(movePositionX+40, movePositionY+75)
  context.value.stroke();

  context.value.moveTo(movePositionX+45, movePositionY+110)
  context.value.lineTo(movePositionX+55, movePositionY+115)
  context.value.lineTo(movePositionX+60, movePositionY+135)
  context.value.stroke();

  context.value.moveTo(movePositionX+25, movePositionY+150)
  context.value.lineTo(movePositionX+40, movePositionY+170)
  context.value.lineTo(movePositionX+30, movePositionY+195)
  context.value.stroke();

  if (scrollStatus[2] != true || scrollStatus[1] != true && scrollStatus[2] != true) return

  context.value.moveTo(movePositionX+65, movePositionY+230)
  context.value.lineTo(movePositionX+75, movePositionY+250)
  context.value.lineTo(movePositionX+90, movePositionY+255)
  context.value.stroke();

  context.value.moveTo(movePositionX+30, movePositionY+310)
  context.value.lineTo(movePositionX+50, movePositionY+360)
  context.value.lineTo(movePositionX+70, movePositionY+370)
  context.value.stroke();

  // цветочек
  context.value.moveTo(movePositionX+50, movePositionY+360)
  context.value.bezierCurveTo(
    movePositionX+60, movePositionY+340, 
    movePositionX+40, movePositionY+340, 
    movePositionX+50, movePositionY+360
  )
  context.value.bezierCurveTo(
    movePositionX+50, movePositionY+340, 
    movePositionX+75, movePositionY+345, 
    movePositionX+50, movePositionY+360
  )
  context.value.bezierCurveTo(
    movePositionX+60, movePositionY+345, 
    movePositionX+80, movePositionY+355, 
    movePositionX+50, movePositionY+360
  )
  context.value.bezierCurveTo(
    movePositionX+70, movePositionY+370, 
    movePositionX+80, movePositionY+350, 
    movePositionX+50, movePositionY+360
  )
  context.value.stroke();

  context.value.moveTo(movePositionX+82, movePositionY+430)
  context.value.bezierCurveTo(
    movePositionX+80, movePositionY+435, 
    movePositionX+70, movePositionY+445, 
    movePositionX+70, movePositionY+450
  )
  context.value.stroke();

  context.value.moveTo(movePositionX+65, movePositionY+230)
  context.value.lineTo(movePositionX+75, movePositionY+250)
  context.value.lineTo(movePositionX+90, movePositionY+255)
  context.value.stroke();

  context.value.moveTo(movePositionX+0, movePositionY+470)
  context.value.lineTo(movePositionX+30, movePositionY+500)
  context.value.lineTo(movePositionX+50, movePositionY+500)
  context.value.stroke();

  context.value.moveTo(movePositionX+60, movePositionY+560)
  context.value.lineTo(movePositionX+50, movePositionY+580)
  context.value.stroke();

  // водоросли внутри
  for (const key in rockSeaweedsInside) { printRockSeaweed(context, movePositionX, movePositionY, rockSeaweedsInside[key]) }
}

const tick = () => {
  context.value.clearRect(0, 0, canvasWidth, canvasHeight) // чистим canvas

  // обнавляем значения параллакса
  parallaxMoveX = ( mouseMoveX - canvas.value.offsetWidth/2 )/parralaxSpeed
  parallaxMoveY = ( mouseMoveY - canvasHeight/2 )/parralaxSpeed

  // вычисляем куда прокручивать
  if (animationMoveDirection != 0) {
    animationMoveDirection > 0 ? 
      animationMoveY+=animationMoveSpeed : 
      animationMoveY-=animationMoveSpeed

    if (
      animationMoveDirection < 0 && 
      animationMoveY <= scrollActive*canvasHeight
    ) animationMoveDirection = 0
    if (
      animationMoveDirection > 0 && 
      animationMoveY >= scrollActive*canvasHeight
    ) animationMoveDirection = 0
  }

  // вызываем функции рисования
  if (scrollStatus[0]) {
    printSun()
    printWave()
    printBlick(0)
    printMouse()
  }

  if (scrollStatus[1]) {
    for (const fish in infoFishs[1]) { printFish(1, fish) }
    printBlick(1)
    for (const skill in infoSkills[1]) { printBlock(1, skill) }
  }

  if (scrollStatus[2]) {
    for (const fish in infoFishs[2]) { printFish(2, fish) }
    printBlick(2)
    for (const skill in infoSkills[2]) { printBlock(2, skill) }
  }

  printRock()

  // перезапускаем каждый тик
  if (store.state.activeCard == 'cardSkills') requestAnimationFrame(tick)
}



// Старт приложения
onBeforeMount(() => {
  if (process.client) {
    window.addEventListener('resize', updateSize)
    updateSize()
  }
})

onMounted(() => {
  if (process.client) {
    canvasInit()
  }
})

watch(
  () => store.state.activeCard,
  (activeCard) => {
    if (activeCard === 'cardSkills' && globalSize.value) requestAnimationFrame(tick);
  }
)
</script>