<template>
  <div class="card card-start" id="cardStart">
    <div class="card__content card-start__content">
      <h1 class="text-shadow">{{ printData.value.h1 }}</h1>
      <h2 class="text-shadow">{{ printData.value.h2 }}</h2>
      <button @click="showMore">Показать больше</button>
    </div>

    <div class="card__background card-start__background">
      <canvas id="canvasGrass" width="698" height="448"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardStart",
  data() {
    return {
      printData: {
        text: {
          china: {
            h1: "唐特拉菲克",
            h2: "如果你编程，那么用爱",
          },
          rus: {
            h1: "DonTraffic",
            h2: "Если программировать, то с любовью",
          },
        },
        value: {
          h1: "",
          h2: "",
        },
        setting: {
          interval: 100,
          intervalSet: 0,
        },
      },

      canvas: null,
      context: null,
      globalSize: null,

      // Настройки солнца
      angleSun: 2.6,
      speedSun: 0.0015,

      // Зададим значение отклонения влево
      grassDeviationMax: 10,
      grassDeviationSpeed: 0.025,

      // настройки травинки
      grassCount: 0,
      grassSizeMax: 0,

      // Генерируем случайные значения
      grassRandomSize: [],
      grassRandomDeviation: [],
      grassRandomPosition: [],
    };
  },

  mounted() {
    this.printText(); 

    this.canvas = document.getElementById('canvasGrass');
    this.context = this.canvas.getContext('2d');

    // настраиваем размеры canvas относительно глобальных размеров
    this.globalSize = window.innerWidth > 425
    if (process.client) this.canvas.width = this.globalSize ? 
      document.querySelector('.card-start').offsetWidth : 
      window.innerWidth
    if (process.client) this.canvas.height = this.globalSize ? 
      document.querySelector('.card-start').offsetHeight : 
      window.innerHeight

    // Переводём точку отсчета в левый нижний угол
    this.context.translate(0, this.canvas.height);
    this.context.scale(1, -1);

    // задаём общий цвет
    this.context.fillStyle = "rgb(235, 235, 235)";

    // // настройки травинки
    this.grassWidth = 8
    this.grassCount = (this.canvas.width/this.grassWidth) + 20
    this.grassSizeMax = process.client && this.globalSize ? 180 : 225

    // Генерируем случайные значения
    for (let i = 0; i < this.grassCount; i++) {
      // позиция
      this.grassRandomPosition.push((i * (this.grassWidth-1)) + (Math.floor(Math.random() * 5) + this.grassWidth) - 20)
      // отклонение 
      this.grassRandomDeviation.push([Math.round( Math.random() * (this.grassDeviationMax - 1) ), Boolean(Math.round( Math.random() * 1 ))])
      // высота
      this.grassRandomSize.push( (Math.random() * (this.grassSizeMax - (this.grassSizeMax - 20)) + this.grassSizeMax - 20) )
    }

    requestAnimationFrame(this.tick)

  },

  methods: {
    printGrass(i) {
      // получаем настройки
      let startX = this.grassRandomPosition[i]
      let grassSize = this.grassRandomSize[i]
      let grassDeviation = this.grassRandomDeviation[i][0]

      // проверяем, в какую сторону наклоняется травинка
      if (grassDeviation >= this.grassDeviationMax || grassDeviation <= -this.grassDeviationMax) this.grassRandomDeviation[i][1] = !this.grassRandomDeviation[i][1]

      this.grassRandomDeviation[i][1] ? 
        this.grassRandomDeviation[i][0] += this.grassDeviationSpeed : 
        this.grassRandomDeviation[i][0] -= this.grassDeviationSpeed;

      // рисуем травинку
      this.context.beginPath()
      this.context.bezierCurveTo(
        startX, 0,
        startX + 3 - grassDeviation * 0, grassSize/1.2,
        startX + 6 - this.grassWidth - grassDeviation * 5, grassDeviation > 0 ? (grassSize - grassDeviation * 2) : (grassSize + grassDeviation * 2),
      );
      this.context.bezierCurveTo(
        startX + 9 - grassDeviation * 2, grassSize/1.2 + grassDeviation/3,
        startX + 12, grassSize/2 + grassDeviation,
        startX + 12, 0
      );
      this.context.closePath();
      this.context.shadowBlur = 5;
      this.context.shadowColor = "rgb(235, 235, 235)";
      this.context.fill();
    },

    createSun() {
      // Заставляем солнце сбавлять скорость в конце пути
      if (this.speedSun > 0.000001 && this.angleSun > 4.5) this.speedSun -= 0.00002
      if (this.angleSun < 4.7) this.angleSun += Math.PI * this.speedSun

      // Рисуем солнце
      this.context.beginPath()
      this.context.arc(
        this.canvas.width / 1.3 + (this.globalSize ? 400 : window.innerWidth / 1.3 ) * Math.cos(-this.angleSun), 
        this.canvas.height / 12 + (this.globalSize ? 300 : window.innerHeight / 1.5 ) * Math.sin(-this.angleSun), 
        70, 0, Math.PI * 2
      )
      this.context.shadowBlur = 15;
      this.context.shadowColor = "rgb(235, 235, 235)";
      this.context.fill()
    },

    tick() {
      // чистим canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Создаём траву
      for (let i = 0; i < this.grassCount; i++) { this.printGrass(i) }

      // создаём солнце
      this.createSun()

      // отрисовываем каждый тик
      if (this.$store.state.activeCard == 'cardStart') requestAnimationFrame(this.tick)
    },

    showMore() {
      document.getElementById("cardMenu").classList.remove("card__position-bottom");
      this.$store.commit("changeActiveCard", "cardMenu");
    },

    printText() {
      let dataText = this.printData.text;
      let dataValue = this.printData.value;
      for (
        let countLang = 0;
        countLang < Object.keys(dataText).length;
        countLang++
      ) {
        let langKey = Object.keys(dataText)[countLang];
        setTimeout(() => {
          for (
            let countText = 0;
            countText < Object.keys(dataText[langKey]).length;
            countText++
          ) {
            let textKey = Object.keys(dataText[langKey])[countText];
            for (
              let countLetter = 0;
              countLetter < dataText[langKey][textKey].length;
              countLetter++
            ) {
              setTimeout(() => {
                dataValue[textKey].length > countLetter
                  ? (dataValue[textKey] = dataValue[textKey].replace(
                      dataValue[textKey][countLetter],
                      dataText[langKey][textKey][countLetter]
                    ))
                  : (dataValue[textKey] +=
                      dataText[langKey][textKey][countLetter]);
              }, (this.printData.setting.interval += 100));
            }
          }
        }, (this.printData.setting.interval += this.printData.setting.intervalSet));
        this.printData.setting.intervalSet = 500;
      }
    },
  },
};
</script>