<template>
  <div class="card card-skills card__position-left" id="cardSkills" >
    <div class="card__content card-skills__content">
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
    </div>

    <modals-modalSkill
      :activeSkill="activeSkill"
      :info="infoSkills[activeSkill]"
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
        canvasHeight: 0,
      context: null,
      globalSize: 0,

      // значения для print mouse
      wheelStatus: 1,
      wheelMove: 1,

      // значения анимации slider move
      scrollStatus: 0,
      scrollStatusMax: -1,
      handleScrollStatus: true,
      startPositionTouch: 0,
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
          slide: 1,
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
          slide: 1,
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
            y: 150,
          },
          slide: 1,
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
          slide: 1,
          color: 15,
        },
      },

      // значения для скалы
      rockSeaweeds: {
        0: {
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
        }
      },

      // значения для рыб
      infoFishs: {
        0: {
          position: {
            x: 0,
            y: 500
          },
          fishSize: 7,
          fishSpeed: 0.6
        },

        1: {
          position: {
            x: 200,
            y: 300
          },
          fishSize: 2,
          fishSpeed: 0.8
        },

        2: {
          position: {
            x: 100,
            y: 350
          },
          fishSize: 1,
          fishSpeed: 0.4
        }
      }
    };
  },

  mounted() {
    // обьявляем канвас
    this.canvas = document.getElementById('canvas-sea');
    this.context = this.canvas.getContext('2d');

    // настраиваем размеры canvas относительно глобальных размеров
    this.globalSize = window.innerWidth > 425
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

    // запускаем анимацию
    requestAnimationFrame(this.tick)
  },

  watch: {
    // следим за активным слайдом и возобнавляем рабьоту анимации
    '$store.state.activeCard' (activeCard) {
      if (activeCard == 'cardSkills') requestAnimationFrame(this.tick)
    }
  },

  methods: {
    handlerClick(e) {
      // блоки навыков
      for (const key in this.infoSkills) {
        let item = this.infoSkills[key]

        let coordX = (item.position.x < 0 ? this.canvasWidth + item.position.x : item.position.x) + 
          -this.parallaxMoveX/4
        let coordY = (item.position.y < 0 ? this.canvasHeight + item.position.y : item.position.y) + 
          -this.parallaxMoveY/4 + (this.canvasHeight * item.slide) + this.animationMoveY
        let textWidth = this.context.measureText(item.skill).width + 10

        if(
          coordX - this.blocksRadius < e.offsetX && e.offsetX < coordX + textWidth + this.blocksRadius && 
          coordY - this.blocksRadius < e.offsetY && e.offsetY < coordY + this.blocksHeight + this.blocksRadius
        )  this.openDialog(key)
      }
    },

    changeScrollPosition(direction) {
      if (!this.handleScrollStatus) return
        this.handleScrollStatus = false
        setTimeout(() => { this.handleScrollStatus = true }, 1500);

        if (!direction && this.scrollStatus == 0) return
          !direction ? this.scrollStatus++ : this.scrollStatus-- 
          !direction ? this.animationMoveDirection++ : this.animationMoveDirection-- 

        if (this.scrollStatus < this.scrollStatusMax) {
          this.scrollStatus++
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

    printFish(fish) {
      let positionY = this.infoFishs[fish].position.y + this.animationMoveY - this.parallaxMoveY/2
      let positionX = this.infoFishs[fish].position.x - this.parallaxMoveX/2
      let fishSize = this.infoFishs[fish].fishSize
      let fishSpeed = this.infoFishs[fish].fishSpeed

      this.infoFishs[fish].position.x < -100 ? 
        this.infoFishs[fish].position.x = this.canvasWidth : 
        this.infoFishs[fish].position.x-= fishSpeed

      this.context.beginPath();
        // туловище
        this.context.moveTo(
          positionX + fishSize, 
          positionY + 300
        );
          this.context.bezierCurveTo(
            positionX + 5 + fishSize, 
            positionY + 300 - 15 + fishSize,

            positionX + 35 - fishSize, 
            positionY + 300 - 15 + fishSize,

            positionX + 50 - fishSize, 
            positionY + 300,
          );
          this.context.bezierCurveTo(
            positionX + 35 - fishSize, 
            positionY + 300 + 15 - fishSize,

            positionX + 5, 
            positionY + 300 + 15 - fishSize,

            positionX + fishSize, 
            positionY + 300,
          );
        this.context.fill()

        // хвост
        this.context.moveTo(
          positionX + 50 - fishSize, 
          positionY + 300
        );
          this.context.bezierCurveTo(
            positionX + 65 - fishSize, 
            positionY + 300 - 15 + fishSize,

            positionX + 70 - fishSize, 
            positionY + 300 - 15 + fishSize,

            positionX + 60 - fishSize, 
            positionY + 300,
          );
          this.context.bezierCurveTo(
            positionX + 70 - fishSize, 
            positionY + 300 + 15 - fishSize,

            positionX + 65 - fishSize, 
            positionY + 300 + 15 - fishSize,

            positionX + 50 - fishSize, 
            positionY + 300,
          );
        this.context.fill()

        // глаз
        this.context.moveTo(
          positionX + 13 + 3 + fishSize/4, 
          positionY + 300 - 3 + fishSize/4
        );
        this.context.arc(
          positionX + 13 + fishSize/4, 
          positionY + 300 - 3 + fishSize/4,

          3 - Number('0.' + fishSize), 0, Math.PI*2,

          true
        );

        // жабры
        this.context.moveTo(
          positionX + 22, 
          positionY + 300 - 6 + fishSize/3
        );
        this.context.bezierCurveTo(
          positionX + 25, 
          positionY + 300 - 2,

          positionX + 25, 
          positionY + 300 + 2,

          positionX + 22, 
          positionY + 300 + 6 - fishSize/3,
        );

        // плавник (верхний)
        this.context.moveTo(
          positionX + 18, 
          positionY + 300 - 12 + fishSize
        );
        this.context.bezierCurveTo(
          positionX + 24, 
          positionY + 300 - 20 + fishSize,

          positionX + 24, 
          positionY + 300 - 20 + fishSize,

          positionX + 25, 
          positionY + 300 - 12 + fishSize,
        );

        // плавник (нижний)
        this.context.moveTo(
          positionX + 28, 
          positionY + 300 + 10 - fishSize/1.5
        );
        this.context.bezierCurveTo(
          positionX + 36, 
          positionY + 300 + 18 - fishSize/1.5,

          positionX + 36, 
          positionY + 300 + 18 - fishSize/1.5,

          positionX + 35, 
          positionY + 300 + 8 - fishSize/1.5,
        );

      this.context.stroke()
    },

    printBlick(slide) {
      let blickStart = slide == 0 ? (this.canvasHeight/4.8)*3 : this.canvasHeight*slide ;

      function blickCreate(context, blick) {
        context.blicksInfo[slide][blick] = {}
        context.blicksInfo[slide][blick].width = Math.floor(Math.random() * (context.canvasWidth))
        context.blicksInfo[slide][blick].height = blickStart + Math.floor(Math.random() * blickStart)
        context.blicksInfo[slide][blick].offset = Math.floor(Math.random() * context.blickCount*2)
        context.blicksInfo[slide][blick].anim = 0
      }

      for (let blick = 0; blick < this.blickCount; blick++) {
        if (!this.blicksInfo[slide]) this.blicksInfo[slide] = {}
        if (!this.blicksInfo[slide][blick]) blickCreate(this, blick)

        let infoBlick = this.blicksInfo[slide][blick]

        if (infoBlick.offset !=0) {
          this.blicksInfo[slide][blick].offset--
          continue
        }

        infoBlick.anim += .3
          if (infoBlick.anim > this.blickLimit*2) blickCreate(this, blick)

        this.context.beginPath();

        this.context.moveTo(
          infoBlick.width - this.parallaxMoveX + (infoBlick.anim >= this.blickLimit ? infoBlick.anim - this.blickLimit : 0), 
          infoBlick.height - this.parallaxMoveY + this.animationMoveY
        );
        this.context.lineTo(
          infoBlick.width - this.parallaxMoveX + (infoBlick.anim >= this.blickLimit ? this.blickLimit : infoBlick.anim), 
          infoBlick.height - this.parallaxMoveY + this.animationMoveY
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

    printBlock(data, key) {
      let item = data[key]
      let parallaxX = -this.parallaxMoveX/4
      let parallaxY = -this.parallaxMoveY/4

      // задаём переменные
      let coordX = (item.position.x < 0 ? this.canvasWidth + item.position.x : item.position.x) + 
        parallaxX
      let coordY = (item.position.y < 0 ? this.canvasHeight + item.position.y : item.position.y) + 
        parallaxY + (this.canvasHeight*item.slide) + this.animationMoveY
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

    printRock() {
      let movePositionX = -10 + (-this.parallaxMoveX/8)
      let movePositionY = this.canvasHeight - 50 + this.animationMoveY + (this.canvasHeight/4)*3 + (-this.parallaxMoveY/8)

      function printRockSeaweed(context, data) {
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
      }

      // водоросли
      for (const key in this.rockSeaweeds) { printRockSeaweed(this.context, this.rockSeaweeds[key]) }

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
    },

    tick() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) // чистим canvas

      // обнавляем значения параллакса
      this.parallaxMoveX = ( this.mouseMoveX - this.canvas.offsetWidth/2 ) /this.parralaxSpeed
      this.parallaxMoveY = ( this.mouseMoveY - this.canvasHeight/2 ) /this.parralaxSpeed

      // вычисляем куда прокручивать (переделать на плавную прокрутки)
      if (this.animationMoveDirection != 0) {
        this.animationMoveDirection > 0 ? 
          this.animationMoveY+=this.animationMoveSpeed : 
          this.animationMoveY-=this.animationMoveSpeed

        if (this.animationMoveDirection < 0 && this.animationMoveY <= this.scrollStatus*this.canvasHeight) this.animationMoveDirection = 0
        if (this.animationMoveDirection > 0 && this.animationMoveY >= this.scrollStatus*this.canvasHeight) this.animationMoveDirection = 0
      }

      // вызываем функции рисования
      this.printSun()
      this.printWave()
      for (const fish in this.infoFishs) { this.printFish(fish) }
      this.printRock()
      for (let i = 0; i < 2; i++) { this.printBlick(i) }
      for (const skill in this.infoSkills) { this.printBlock(this.infoSkills, skill) }
      this.printMouse()

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