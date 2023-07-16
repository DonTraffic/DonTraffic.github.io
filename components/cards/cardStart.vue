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
    };
  },

  mounted() {
    this.printText(); 

    const canvas = document.getElementById('canvasGrass');
    const context = canvas.getContext('2d');

    // настраиваем размеры canvas относительно глобальных размеров
    const globalSize = window.innerWidth > 425
    if (process.client) canvas.width = globalSize ? 
      document.querySelector('.card-start').offsetWidth : 
      window.innerWidth
    if (process.client) canvas.height = globalSize ? 
      document.querySelector('.card-start').offsetHeight : 
      window.innerHeight

    // Переводём точку отсчета в левый нижний угол
    context.translate(0, canvas.height);
    context.scale(1, -1);

    // задаём общий цвет
    context.fillStyle = "white";

    // Настройки солнца
    let angleSun = 2.6
    let speedSun = 0.0015

    // Зададим значение отклонения влево
    let grassDeviationMax = 10
    let grassDeviationSpeed = 0.025

    // настройки травинки
    let grassCount = process.client && globalSize ? 200 : 100
    let grassSizeMax = process.client && globalSize ? 180 : 225

    // Генерируем случайные значения
    let grassRandomSize = []
    let grassRandomDeviation = []
    let grassRandomPosition = []
    for (let i = 0; i < grassCount; i++) {
      // позиция
      grassRandomPosition.push(Math.round( Math.random() * canvas.width ))
      // отклонение 
      grassRandomDeviation.push([Math.round( Math.random() * (grassDeviationMax - 1) ), Boolean(Math.round( Math.random() * 1 ))])
      // высота
      grassRandomSize.push( (Math.random() * (grassSizeMax - (grassSizeMax - 20)) + grassSizeMax - 20) )
    }

    // генерируем травинку
    function createGrass(i) {
      // получаем настройки
      let startX = grassRandomPosition[i]
      let grassSize = grassRandomSize[i]
      let grassDeviation = grassRandomDeviation[i][0]

      // проверяем, в какую сторону наклоняется травинка
      if (grassDeviation >= grassDeviationMax || grassDeviation <= -grassDeviationMax) grassRandomDeviation[i][1] = !grassRandomDeviation[i][1]

      grassRandomDeviation[i][1] ? 
        grassRandomDeviation[i][0] += grassDeviationSpeed : 
        grassRandomDeviation[i][0] -= grassDeviationSpeed;

      // рисуем травинку
      context.beginPath()
      context.bezierCurveTo(
        startX, 0,
        startX + 3 - grassDeviation * 0, grassSize/1.2,
        startX + 6 - grassDeviation * 5, grassDeviation > 0 ? (grassSize - grassDeviation * 2) : (grassSize + grassDeviation * 2),
      );
      context.bezierCurveTo(
        startX + 9 - grassDeviation * 2, grassSize/1.2 + grassDeviation/3,
        startX + 12, grassSize/2 + grassDeviation,
        startX + 12, 0
      );
      context.closePath();
      context.shadowBlur = 5;
      context.shadowColor = "white";
      context.fill();
    }

    function createSun() {
      // Заставляем солнце сбавлять скорость в конце пути
      if (speedSun > 0.000001 && angleSun > 4.5) speedSun -= 0.00002
      if (angleSun < 4.7) angleSun += Math.PI * speedSun

      // Рисуем солнце
      context.beginPath()
      context.arc(
        canvas.width / 1.3 + (globalSize ? 400 : window.innerWidth / 1.3 ) * Math.cos(-angleSun), 
        canvas.height / 12 + (globalSize ? 300 : window.innerHeight / 1.5 ) * Math.sin(-angleSun), 
        70, 0, Math.PI * 2
      )
      context.shadowBlur = 15;
      context.shadowColor = "white";
      context.fill()
    }

    function tick() {
      // отрисовываем каждый тик
      requestAnimationFrame(tick)

      // чистим canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Создаём траву
      for (let i = 0; i < grassCount; i++) { createGrass(i) }

      // создаём солнце
      createSun()
    }
    requestAnimationFrame(tick)

  },

  methods: {
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