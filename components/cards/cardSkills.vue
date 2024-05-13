<template>
  <div class="card card-skills card__position-left" id="cardSkills" >
    <div 
      class="card__content card-skills__content"
      v-if="scrollStatus[0] == true"
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

        @mousemove="(e) => {
          const rect = this.canvas.getBoundingClientRect()
          this.mouseMoveX = e.clientX - rect.left
          this.mouseMoveY = e.clientY - rect.top
        }"

        @wheel="(e) => this.changeScrollPosition(e.deltaY > 0 ? true : false)"

        @click="(e) => this.handlerClick(e)"
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
        right: 'cardMenu',
      }"
    />
  </div>
</template>

<script>
export default {
  name: "cardSkills",
  data() {
    return {
      // значения canvas
      canvas: null,
        canvasHeight: 0,
        canvasWidth: 0,
      context: null,
      globalSize: 0,

      // значения для print mouse
      wheelStatus: 1,
      wheelMove: 1,

      // значения анимации slider move
      scrollActive: 0,
      scrollStatus: {
        0: true,
      },
      scrollCountMax: 3,
      handleScrollStatus: true,
      animationMoveY: 0, // -450
      animationMoveDirection: 0,
      animationMoveSpeed: 4,

      // глобальное положение курсора
      mouseMoveX: 0,
      mouseMoveY: 0,

      // значения параллакса
      parallaxMoveX: 0,
      parallaxMoveY: 0,
      parralaxSpeed: 15,

      // значения волн
      waveLenght: 150,
      offsetLeft: 300,
      waveMaxHeight: 4,
      waveOffsetHeightTop: 0,
      offsetHeight: 10,
      waveCount: 13,
      wavePossition: [0, 0, 51, 154, 0],

      // значения блик
      blickCount: 20,
      blickLimit: 20,
      blicksInfo: {},

      // значения для блоков скиллов
      blocksHeight: 30,
      blocksRadius: 10,
      activeSkill: '',
      controllerHide: false,
      infoSkills: {
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
              x: 200,
              y: 100,
            },
            color: 15,
          },
        }
      },

      // значения для скалы
      rockSeaweeds: {
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
      },

      rockSeaweedsInside: {
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
      },

      // значения для рыб
      infoFishs: {
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
      },
    };
  },

  mounted() {
    this.globalSize = window.innerWidth > 425
    this.canvas = document.getElementById('canvas-sea');

    if(this.globalSize) {
      // обьявляем канвас
      this.context = this.canvas.getContext('2d');

      // настраиваем размеры canvas относительно глобальных размеров
      this.canvasWidth = this.globalSize ? 
        document.querySelector('.card').offsetWidth : 
        window.innerWidth ;
        this.canvas.width = this.canvasWidth
      this.canvasHeight = this.globalSize ? 
        document.querySelector('.card').offsetHeight : 
        window.innerHeight ;
        this.canvas.height = this.canvasHeight

      // задаём динамический отступ волн от верха
      this.waveOffsetHeightTop = document.querySelector('.card').offsetHeight/2

      // задаём общий цвет
      this.context.fillStyle = "rgb(15, 15, 15)";
      this.context.strokeStyle = "rgb(235, 235, 235)";
      this.context.lineWidth = 1;
      this.context.shadowColor = "rgb(235, 235, 235)";

      // создаём значения для рыбы
      for (const slide in this.infoFishs) {
        for (const fish in this.infoFishs[slide]) { this.generateFish(slide, fish, true) }
      }

      // запускаем анимацию
      requestAnimationFrame(this.tick)
    } else {
      this.canvas.remove()
    }
  },

  watch: {
    // следим за активным слайдом и возобнавляем работу анимации
    '$store.state.activeCard' (activeCard) {
      if (activeCard == 'cardSkills' && this.globalSize) requestAnimationFrame(this.tick)
    }
  },

  methods: {
    handlerClick(e) {
      // блоки навыков
      for (const key in this.infoSkills[-this.scrollActive]) {
        let item = this.infoSkills[-this.scrollActive][key]

        let coordX = (item.position.x < 0 ? this.canvasWidth + item.position.x : item.position.x) + 
          -this.parallaxMoveX/4
        let coordY = (item.position.y < 0 ? this.canvasHeight + item.position.y : item.position.y) + 
          -this.parallaxMoveY/4 + (this.canvasHeight * (-this.scrollActive)) + this.animationMoveY
        let textWidth = this.context.measureText(item.skill).width + 10

        if(
          coordX - this.blocksRadius < e.offsetX && e.offsetX < coordX + textWidth + this.blocksRadius && 
          coordY - this.blocksRadius < e.offsetY && e.offsetY < coordY + this.blocksHeight + this.blocksRadius
        ) this.openDialog(key)
      }
    },

    randomInteger(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    },

    changeScrollPosition(direction) {
      if (!this.handleScrollStatus) return
        this.handleScrollStatus = false
        setTimeout(() => { 
          this.handleScrollStatus = true;

          for (const key in this.scrollStatus) {
            this.scrollStatus[key] = false
          }
          this.scrollStatus[-this.scrollActive] = true
        }, 1000);

        if (!direction && this.scrollActive == 0) return
          if (!direction) {
            this.scrollActive++
            this.animationMoveDirection++
          } else {
            this.scrollActive--
            this.animationMoveDirection--
          }
          this.scrollStatus[-this.scrollActive] = true

        if (this.scrollActive <= -this.scrollCountMax) {
          this.scrollActive++
          this.animationMoveDirection++
        }
    },

    printSun(){
      this.context.fillStyle = "rgb(235, 235, 235)";
      this.context.shadowBlur = 50

      this.context.beginPath()
        this.context.arc(
          document.querySelector('.card').offsetWidth - 145 - this.parallaxMoveX/7, 
          145 - this.parallaxMoveY/7,

          100, 0, Math.PI*2,

          true
        );
      this.context.closePath()
      this.context.stroke()
      this.context.fill()

      this.context.fillStyle = "rgb(15, 15, 15)";
      this.context.shadowBlur = 0
    },

    printWave() {
      this.context.shadowBlur = 10
      // context.setLineDash([40, 70])

      for (let i = 1; i < this.wavePossition.length; i++) {
        this.wavePossition[i]+= .15 + (.1*i)

        let parallaxX = -this.parallaxMoveX * (i/3)
        let parallaxY = -this.parallaxMoveY * (i/3)

        this.context.beginPath()

        this.context.moveTo(
          (this.waveLenght * 0) - this.offsetLeft + parallaxX + this.wavePossition[i], 
          this.waveOffsetHeightTop + (this.offsetHeight*i) + parallaxY + this.animationMoveY
        )

        for (let wave = 0; wave < this.waveCount; wave++) {  

          let firstCoord = ((this.waveLenght * wave)) - this.offsetLeft + parallaxX
          let secondCoord = ((this.waveLenght * wave) + this.waveLenght/2) - this.offsetLeft + parallaxX
          let thirdCoord = ((this.waveLenght * wave) + this.waveLenght) - this.offsetLeft + parallaxX
  
          if (firstCoord + this.wavePossition[i] > (this.waveLenght*this.waveCount) - this.offsetLeft) this.wavePossition[i]-= this.waveLenght*2
  
          this.context.bezierCurveTo(
            firstCoord + this.wavePossition[i], 
            this.waveOffsetHeightTop + (this.offsetHeight*i) + parallaxY + this.animationMoveY,

            secondCoord + this.wavePossition[i], 
            this.waveOffsetHeightTop + (this.offsetHeight*i) + parallaxY + this.animationMoveY + (wave%2 ? this.waveMaxHeight + 6*i : -this.waveMaxHeight - 6*i),

            thirdCoord + this.wavePossition[i], 
            this.waveOffsetHeightTop + (this.offsetHeight*i) + parallaxY + this.animationMoveY
          );
        }

        // Закрываем волну
        this.context.lineTo((this.waveLenght * this.waveCount) - this.waveLenght + this.wavePossition[i] + parallaxX, this.canvasHeight + 10)
        this.context.lineTo(this.wavePossition[i] - this.waveLenght + parallaxX, this.canvasHeight + 10)

        // закрашиваем волну
        this.context.closePath()
        this.context.stroke()
        this.context.fill()
      }

      this.context.shadowBlur = 0;
    },

    generateFish(slide, fish, first) {
      this.infoFishs[slide][fish] = {
        speed:  this.randomInteger(50, 100),
        size:  this.randomInteger(0, 8),
        direction: Boolean(this.randomInteger(0, 1)),
      }
      this.infoFishs[slide][fish].position = {
        x: first ? 
          this.randomInteger(0, this.canvasWidth) : 
          this.infoFishs[slide][fish].direction ? -100 : this.canvasWidth,
        y: (this.canvasHeight * slide) + this.randomInteger(50, this.canvasHeight-50),
      }
    },

    printFish(slide, key) {
      let fish = this.infoFishs[slide][key]
      let positionY = this.animationMoveY + fish.position.y - this.parallaxMoveY/2
      let positionX = fish.position.x - this.parallaxMoveX/2
      let size = fish.size
      let speed = fish.speed/100
      let direction = fish.direction

      if (direction) {
        fish.position.x > this.canvasWidth + 50 ? this.generateFish(slide, key, false) : fish.position.x+= speed

        this.context.beginPath();
          // туловище
          this.context.moveTo(
            positionX - size, 
            positionY
          );
            this.context.bezierCurveTo(
              positionX - 5 - size, 
              positionY - 15 + size,

              positionX - 35 + size, 
              positionY - 15 + size,

              positionX - 50 + size, 
              positionY,
            );
            this.context.bezierCurveTo(
              positionX - 35 + size, 
              positionY + 15 - size,

              positionX - 5, 
              positionY + 15 - size,

              positionX - size, 
              positionY,
            );
          this.context.fill()

          // хвост
          this.context.moveTo(
            positionX - 50 + size, 
            positionY
          );
            this.context.bezierCurveTo(
              positionX - 65 + size, 
              positionY - 15 + size,

              positionX - 70 + size, 
              positionY - 15 + size,

              positionX - 60 + size, 
              positionY,
            );
            this.context.bezierCurveTo(
              positionX - 70 + size, 
              positionY + 15 - size,

              positionX - 65 + size, 
              positionY + 15 - size,

              positionX - 50 + size, 
              positionY,
            );
          this.context.fill()

          // глаз
          this.context.moveTo(
            positionX - 13 + 3 - size/4, 
            positionY - 3 + size/4
          );
          this.context.arc(
            positionX - 13 - size/4, 
            positionY - 3 + size/4,

            3 - Number('0.' + size), 0, Math.PI*2,

            true
          );

          // жабры
          this.context.moveTo(
            positionX - 22, 
            positionY - 6 + size/3
          );
          this.context.bezierCurveTo(
            positionX - 25, 
            positionY - 2,

            positionX - 25, 
            positionY + 2,

            positionX - 22, 
            positionY + 6 - size/3,
          );

          // плавник (верхний)
          this.context.moveTo(
            positionX - 18, 
            positionY - 12 + size
          );
          this.context.bezierCurveTo(
            positionX - 24, 
            positionY - 20 + size,

            positionX - 24, 
            positionY - 20 + size,

            positionX - 25, 
            positionY - 12 + size,
          );

          // плавник (нижний)
          this.context.moveTo(
            positionX - 28, 
            positionY + 10 - size/1.5
          );
          this.context.bezierCurveTo(
            positionX - 36, 
            positionY + 18 - size/1.5,

            positionX - 36, 
            positionY + 18 - size/1.5,

            positionX - 35, 
            positionY + 8 - size/1.5,
          );

        this.context.stroke()
      } else {
        fish.position.x < -50 ? this.generateFish(slide, key, false) : fish.position.x-= speed

        this.context.beginPath();
          // туловище
          this.context.moveTo(
            positionX + size, 
            positionY
          );
            this.context.bezierCurveTo(
              positionX + 5 + size, 
              positionY - 15 + size,

              positionX + 35 - size, 
              positionY - 15 + size,

              positionX + 50 - size, 
              positionY,
            );
            this.context.bezierCurveTo(
              positionX + 35 - size, 
              positionY + 15 - size,

              positionX + 5, 
              positionY + 15 - size,

              positionX + size, 
              positionY,
            );
          this.context.fill()

          // хвост
          this.context.moveTo(
            positionX + 50 - size, 
            positionY
          );
            this.context.bezierCurveTo(
              positionX + 65 - size, 
              positionY - 15 + size,

              positionX + 70 - size, 
              positionY - 15 + size,

              positionX + 60 - size, 
              positionY,
            );
            this.context.bezierCurveTo(
              positionX + 70 - size, 
              positionY + 15 - size,

              positionX + 65 - size, 
              positionY + 15 - size,

              positionX + 50 - size, 
              positionY,
            );
          this.context.fill()

          // глаз
          this.context.moveTo(
            positionX + 13 + 3 + size/4, 
            positionY - 3 + size/4
          );
          this.context.arc(
            positionX + 13 + size/4, 
            positionY - 3 + size/4,

            3 - Number('0.' + size), 0, Math.PI*2,

            true
          );

          // жабры
          this.context.moveTo(
            positionX + 22, 
            positionY - 6 + size/3
          );
          this.context.bezierCurveTo(
            positionX + 25, 
            positionY - 2,

            positionX + 25, 
            positionY + 2,

            positionX + 22, 
            positionY + 6 - size/3,
          );

          // плавник (верхний)
          this.context.moveTo(
            positionX + 18, 
            positionY - 12 + size
          );
          this.context.bezierCurveTo(
            positionX + 24, 
            positionY - 20 + size,

            positionX + 24, 
            positionY - 20 + size,

            positionX + 25, 
            positionY - 12 + size,
          );

          // плавник (нижний)
          this.context.moveTo(
            positionX + 28, 
            positionY + 10 - size/1.5
          );
          this.context.bezierCurveTo(
            positionX + 36, 
            positionY + 18 - size/1.5,

            positionX + 36, 
            positionY + 18 - size/1.5,

            positionX + 35, 
            positionY + 8 - size/1.5,
          );

        this.context.stroke()
      }
    },

    blickCreate(slide, key, blickStart) {
      let blick = this.blicksInfo[slide]

      blick[key] = {}
      blick[key].width = this.randomInteger(0, this.canvasWidth)
      blick[key].height = slide == 0 ? 
        this.randomInteger(blickStart, this.canvasHeight) : 
        this.randomInteger(blickStart, blickStart + this.canvasHeight)
      blick[key].offset = this.randomInteger(0, 40)
      blick[key].anim = 0
    },

    printBlick(slide) {
      let blickStart = slide == 0 ? (this.canvasHeight/4.8)*3 : this.canvasHeight*slide ;

      for (let blick = 0; blick < this.blickCount; blick++) {
        if (!this.blicksInfo[slide]) this.blicksInfo[slide] = {}
        if (!this.blicksInfo[slide][blick]) this.blickCreate(slide, blick, blickStart)

        let infoBlick = this.blicksInfo[slide][blick]

        if (infoBlick.offset !=0) {
          infoBlick.offset--
          continue
        }

        infoBlick.anim += .3
          if (infoBlick.anim > this.blickLimit*2) this.blickCreate(slide, blick, blickStart)
        let blickHeight = infoBlick.height - this.parallaxMoveY + this.animationMoveY
        let blickWidth = infoBlick.width - this.parallaxMoveX

        this.context.beginPath();
          this.context.moveTo(
            blickWidth + (infoBlick.anim >= this.blickLimit ? infoBlick.anim - this.blickLimit : 0), 
            blickHeight
          );
          this.context.lineTo(
            blickWidth + (infoBlick.anim >= this.blickLimit ? this.blickLimit : infoBlick.anim), 
            blickHeight
          )
        this.context.stroke()
      }
    },

    printMouse() {
      switch (this.wheelStatus) {
        case 1:
          this.wheelMove+= .5
          if (this.wheelMove >= 10) this.wheelStatus = 2
        break;

        case 2:
          this.wheelMove-= .20
          if (this.wheelMove <= 0) this.wheelStatus = 3
        break;

        case 3:
        this.wheelStatus = 0
          setTimeout(() => {this.wheelStatus = 1}, 2000)
        break;
      }

      this.context.beginPath()
        this.context.arc(
          document.querySelector('.card').offsetWidth/2, 
          document.querySelector('.card').offsetHeight - 45 + this.animationMoveY,

          10, 0, Math.PI,

          true
        );
        this.context.arc(
          document.querySelector('.card').offsetWidth/2, 
          document.querySelector('.card').offsetHeight - 30 + this.animationMoveY,

          10, Math.PI, 0, 

          true
        );
      this.context.closePath()
      this.context.stroke()
      this.context.fill()

      this.context.beginPath()
        this.context.arc(
          document.querySelector('.card').offsetWidth/2, 
          document.querySelector('.card').offsetHeight - 45 + this.wheelMove + this.animationMoveY,

          1, 0, Math.PI,

          true
        );
        this.context.arc(
          document.querySelector('.card').offsetWidth/2, 
          document.querySelector('.card').offsetHeight - 40 + this.wheelMove + this.animationMoveY,

          1, Math.PI, 0, 

          true
        );
      this.context.closePath()
      this.context.stroke()
    },

    printBlock(slide, key) {
      let item = this.infoSkills[slide][key]
      let parallaxX = -this.parallaxMoveX/4
      let parallaxY = -this.parallaxMoveY/4

      // задаём переменные
      let coordX = (item.position.x < 0 ? this.canvasWidth + item.position.x : item.position.x) + 
        parallaxX
      let coordY = (item.position.y < 0 ? this.canvasHeight + item.position.y : item.position.y) + 
        parallaxY + (this.canvasHeight*slide) + this.animationMoveY
      let textWidth = this.context.measureText(key).width + this.blocksRadius

      // следим когда курсор будет над блоком текста
      if(
        coordX - this.blocksRadius < this.mouseMoveX && this.mouseMoveX < coordX + textWidth + this.blocksRadius && 
        coordY - this.blocksRadius < this.mouseMoveY && this.mouseMoveY < coordY + this.blocksHeight + this.blocksRadius
      ) {
        if (item.color < 235) item.color+=5
      } else {
        if (item.color > 15) item.color-=5
      }
      this.context.fillStyle = `rgba(${item.color}, ${item.color}, ${item.color}`

      // рисуем блок текста
      this.context.beginPath()
        this.context.arc(
          coordX, coordY,
          this.blocksRadius, Math.PI, -Math.PI/2,
          false
        )
        this.context.lineTo(coordX, coordY - this.blocksRadius)
        this.context.arc(
          coordX + textWidth , coordY,
          this.blocksRadius, -Math.PI/2, Math.PI/2 - Math.PI/2,
          false
        )
        this.context.lineTo(coordX + textWidth + this.blocksRadius, coordY + this.blocksHeight)
        this.context.arc(
          coordX + textWidth , coordY + this.blocksHeight,
          this.blocksRadius, Math.PI*2, Math.PI/2,
          false
        )
        this.context.lineTo(coordX + textWidth , coordY + this.blocksHeight + this.blocksRadius)
        this.context.arc(
          coordX, coordY + this.blocksHeight,
          this.blocksRadius, Math.PI/2, Math.PI/2 + Math.PI/2,
          false
        )
        this.context.lineTo(coordX - this.blocksRadius, coordY)
      this.context.closePath()
      this.context.fill()

      // пишем текст
      this.context.fillStyle = `rgba(${235 - item.color}, ${235 - item.color}, ${235 - item.color}`;
      this.context.font = '24px Open Sans';
      this.context.textAlign = 'center';
      this.context.fillText(
        key, 
        coordX + textWidth/2, 
        coordY + this.blocksHeight/2 + this.blocksRadius
      );

      this.context.fillStyle = "rgb(15, 15, 15)";
      this.context.stroke()
    },

    printRockSeaweed(context, movePositionX, movePositionY, data) {
      if ( !this.scrollStatus[data.slide] ) return

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

        context.beginPath()
          context.moveTo(positionX, positionY)
          context.bezierCurveTo(
            positionX+rotate/6, positionY-heightSeaweed*1, 
            positionX+deviation+rotate/5, positionY-heightSeaweed*2, 
            positionX+rotate/4, positionY-heightSeaweed*3
          )
          context.bezierCurveTo(
            positionX-deviation+rotate/3, positionY-heightSeaweed*4, 
            positionX-deviation+rotate/2, positionY-heightSeaweed*5, 
            positionX+rotate/1, positionY-heightSeaweed*6
          )
        context.stroke();
        context.closePath()
      }
    },

    printRock() {
      let movePositionX = -10 + (-this.parallaxMoveX/8)
      let movePositionY = this.canvasHeight - 50 + this.animationMoveY + (this.canvasHeight/4)*3 + (-this.parallaxMoveY/8)

      // водоросли
      for (const key in this.rockSeaweeds) { this.printRockSeaweed(this.context, movePositionX, movePositionY, this.rockSeaweeds[key]) }

      // контур скалы
      this.context.beginPath()
        this.context.moveTo(movePositionX+43, movePositionY+11)
        this.context.bezierCurveTo(
          movePositionX+36, movePositionY+3, 
          movePositionX+19, movePositionY+0, 
          movePositionX+1, movePositionY+0
        )
        this.context.lineTo(1, movePositionY+733)
        this.context.bezierCurveTo(
          movePositionX+37, movePositionY+715, 
          movePositionX+46, movePositionY+669, 
          movePositionX+46, movePositionY+648
        )
        this.context.bezierCurveTo(
          movePositionX+80, movePositionY+589, 
          movePositionX+85, movePositionY+481, 
          movePositionX+82, movePositionY+430
        )
        this.context.bezierCurveTo(
          movePositionX+95, movePositionY+399, 
          movePositionX+103, movePositionY+359, 
          movePositionX+108, movePositionY+322
        )
        this.context.bezierCurveTo(
          movePositionX+112, movePositionY+287, 
          movePositionX+114, movePositionY+254, 
          movePositionX+114, movePositionY+233
        )
        this.context.bezierCurveTo(
          movePositionX+103, movePositionY+235, 
          movePositionX+84, movePositionY+221, 
          movePositionX+88, movePositionY+152
        )
        this.context.bezierCurveTo(
          movePositionX+91, movePositionY+83, 
          movePositionX+77, movePositionY+65, 
          movePositionX+70, movePositionY+65
        )
        this.context.bezierCurveTo(
          movePositionX+67, movePositionY+66, 
          movePositionX+63, movePositionY+65, 
          movePositionX+59, movePositionY+63
        )
        this.context.bezierCurveTo(
          movePositionX+53, movePositionY+59, 
          movePositionX+48, movePositionY+50, 
          movePositionX+49, movePositionY+31
        )
        this.context.bezierCurveTo(
          movePositionX+49, movePositionY+22, 
          movePositionX+47, movePositionY+15, 
          movePositionX+43, movePositionY+11
        )
      this.context.closePath();
      this.context.fill();
      this.context.stroke();

      // внутренности скалы
      this.context.moveTo(movePositionX+20, movePositionY+40)
      this.context.lineTo(movePositionX+25, movePositionY+65)
      this.context.lineTo(movePositionX+40, movePositionY+75)
      this.context.stroke();

      this.context.moveTo(movePositionX+45, movePositionY+110)
      this.context.lineTo(movePositionX+55, movePositionY+115)
      this.context.lineTo(movePositionX+60, movePositionY+135)
      this.context.stroke();

      this.context.moveTo(movePositionX+25, movePositionY+150)
      this.context.lineTo(movePositionX+40, movePositionY+170)
      this.context.lineTo(movePositionX+30, movePositionY+195)
      this.context.stroke();

      if (this.scrollStatus[2] != true || this.scrollStatus[1] != true && this.scrollStatus[2] != true) return

      this.context.moveTo(movePositionX+65, movePositionY+230)
      this.context.lineTo(movePositionX+75, movePositionY+250)
      this.context.lineTo(movePositionX+90, movePositionY+255)
      this.context.stroke();

      this.context.moveTo(movePositionX+30, movePositionY+310)
      this.context.lineTo(movePositionX+50, movePositionY+360)
      this.context.lineTo(movePositionX+70, movePositionY+370)
      this.context.stroke();

      // цветочек
      this.context.moveTo(movePositionX+50, movePositionY+360)
      this.context.bezierCurveTo(
        movePositionX+60, movePositionY+340, 
        movePositionX+40, movePositionY+340, 
        movePositionX+50, movePositionY+360
      )
      this.context.bezierCurveTo(
        movePositionX+50, movePositionY+340, 
        movePositionX+75, movePositionY+345, 
        movePositionX+50, movePositionY+360
      )
      this.context.bezierCurveTo(
        movePositionX+60, movePositionY+345, 
        movePositionX+80, movePositionY+355, 
        movePositionX+50, movePositionY+360
      )
      this.context.bezierCurveTo(
        movePositionX+70, movePositionY+370, 
        movePositionX+80, movePositionY+350, 
        movePositionX+50, movePositionY+360
      )
      this.context.stroke();

      this.context.moveTo(movePositionX+82, movePositionY+430)
      this.context.bezierCurveTo(
        movePositionX+80, movePositionY+435, 
        movePositionX+70, movePositionY+445, 
        movePositionX+70, movePositionY+450
      )
      this.context.stroke();

      this.context.moveTo(movePositionX+65, movePositionY+230)
      this.context.lineTo(movePositionX+75, movePositionY+250)
      this.context.lineTo(movePositionX+90, movePositionY+255)
      this.context.stroke();

      this.context.moveTo(movePositionX+0, movePositionY+470)
      this.context.lineTo(movePositionX+30, movePositionY+500)
      this.context.lineTo(movePositionX+50, movePositionY+500)
      this.context.stroke();

      this.context.moveTo(movePositionX+60, movePositionY+560)
      this.context.lineTo(movePositionX+50, movePositionY+580)
      this.context.stroke();

      // водоросли внутри
      for (const key in this.rockSeaweedsInside) { this.printRockSeaweed(this.context, movePositionX, movePositionY, this.rockSeaweedsInside[key]) }
    },

    tick() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) // чистим canvas

      // обнавляем значения параллакса
      this.parallaxMoveX = ( this.mouseMoveX - this.canvas.offsetWidth/2 ) /this.parralaxSpeed
      this.parallaxMoveY = ( this.mouseMoveY - this.canvasHeight/2 ) /this.parralaxSpeed

      // вычисляем куда прокручивать
      if (this.animationMoveDirection != 0) {
        this.animationMoveDirection > 0 ? 
          this.animationMoveY+=this.animationMoveSpeed : 
          this.animationMoveY-=this.animationMoveSpeed

        if (this.animationMoveDirection < 0 && this.animationMoveY <= this.scrollActive*this.canvasHeight) this.animationMoveDirection = 0
        if (this.animationMoveDirection > 0 && this.animationMoveY >= this.scrollActive*this.canvasHeight) this.animationMoveDirection = 0
      }

      // вызываем функции рисования
      if (this.scrollStatus[0]) {
        this.printSun()
        this.printWave()
        this.printBlick(0)
        this.printMouse()
      }

      if (this.scrollStatus[1]) {
        for (const fish in this.infoFishs[1]) { this.printFish(1, fish) }
        this.printBlick(1)
        for (const skill in this.infoSkills[1]) { this.printBlock(1, skill) }
      }

      if (this.scrollStatus[2]) {
        for (const fish in this.infoFishs[2]) { this.printFish(2, fish) }
        this.printBlick(2)
        for (const skill in this.infoSkills[2]) { this.printBlock(2, skill) }
      }

      this.printRock()

      // перезапускаем каждый тик
      if (this.$store.state.activeCard == 'cardSkills') requestAnimationFrame(this.tick)
    },

    openDialog(language) {
      this.activeSkill = language
      this.controllerHide = true
    },

    closeModal() {
      this.activeSkill = ''
      this.controllerHide = false
    }
  },
};
</script>