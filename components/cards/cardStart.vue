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

    <img 
      class="card__background card-start__background--mobile"
      src="@/assets/img/grass.png" 
      alt="grass-mobile"
      v-if="!globalSize" 
    >
  </div>
</template>

<script setup>
import { useStore } from 'vuex';


// Глобальные или общие переменные
const store = useStore();


// Печатание текста
const printData = ref({
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
});

const printText = () => {
  let dataText = printData.value.text;
  let dataValue = printData.value.value;

  for (let countLang = 0; countLang < Object.keys(dataText).length; countLang++) {
    let langKey = Object.keys(dataText)[countLang];

    setTimeout(() => {
      for (let countText = 0; countText < Object.keys(dataText[langKey]).length; countText++) {
        let textKey = Object.keys(dataText[langKey])[countText];

        for (let countLetter = 0; countLetter < dataText[langKey][textKey].length; countLetter++) {
          setTimeout(() => {
            dataValue[textKey].length > countLetter
              ? (dataValue[textKey] = dataValue[textKey].replace(
                  dataValue[textKey][countLetter],
                  dataText[langKey][textKey][countLetter]
                ))
              : (dataValue[textKey] += dataText[langKey][textKey][countLetter]);
          }, (printData.value.setting.interval += 100));
        }
      }
    }, (printData.value.setting.interval += printData.value.setting.intervalSet));
    printData.value.setting.intervalSet = 500;
  }
};


// Определение размеров
const globalSize = ref(false);

const updateSize = () => {
  if (process.client) globalSize.value = window.innerWidth > 425;
}


// Функция смены стартового слайда
const showMore = () => {
  document.getElementById("cardMenu").classList.remove("card--position-bottom");
  store.commit('changeActiveCard', 'cardMenu');
}


// Объявление canvas
const canvas = ref(null)
const context = ref(null)

// Настройки солнца
let angleSun = 2.6
let speedSun = 0.0015

// Зададим значение отклонения влево
let grassDeviationMax = 10
let grassDeviationSpeed = 0.025

// настройки травинки
let grassCount = 0
let grassWidth = 8
let grassSizeMax = 0

// Генерируем случайные значения
let grassRandomSize = []
let grassRandomDeviation = []
let grassRandomPosition = []


// отрисовка анимации каждый тик
const canvasTick = () => {
  // чистим canvas
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // рисуем траву
  if(globalSize.value) for (let i = 0; i < grassCount; i++) { printGrass(i) }

  // рисуем солнце
  printSun()

  // отрисовываем каждый тик
  if (store.state.activeCard == 'cardStart') requestAnimationFrame(canvasTick)
}

// инициализация травинок
const initGrass = () => {
  const elemCard = document.querySelector('.card-start')

  // Отпределяем и настраиваем область canvas
  canvas.value = document.getElementById('canvasGrass')
    canvas.value.width = elemCard.offsetWidth
    canvas.value.height = elemCard.offsetHeight
  context.value = canvas.value.getContext('2d')

  // Переводим точку отсчета в левый нижний угол
  context.value.translate(0, canvas.value.height)
  context.value.scale(1, -1)

  // Задаём общий цвет
  context.value.fillStyle = "rgb(235, 235, 235)"

  // Настройки травинки
  grassCount = Math.round((canvas.value.width / grassWidth) + 20)
  grassSizeMax = globalSize.value ? 180 : 225 ;

  // Генерируем случайные значения
  for (let i = 0; i < grassCount; i++) {
    // Позиция
    grassRandomPosition.push(
      (i * (grassWidth - 1)) + 
      (Math.floor(Math.random() * 5) + grassWidth) - 20
    )

    // Отклонение 
    grassRandomDeviation.push([
      Math.round(Math.random() * (grassDeviationMax - 1)), 
      Boolean(Math.round(Math.random() * 1))
    ])

    // Высота
    grassRandomSize.push(
      Math.random() * 
      (grassSizeMax - (grassSizeMax - 20)) + 
      grassSizeMax - 20
    )
  }

  requestAnimationFrame(canvasTick)
}

// рисуем солнце
const printSun = () => {
  // Заставляем солнце сбавлять скорость в конце пути
  if (speedSun > 0.000001 && angleSun > 4.5) speedSun -= 0.00002;
  if (angleSun < 4.7) angleSun += Math.PI * speedSun;

  // Рисуем солнце
  context.value.beginPath();
  context.value.arc(
    canvas.value.width / 1.3 + (globalSize.value ? 400 : window.innerWidth / 1.3) * Math.cos(-angleSun),
    canvas.value.height / 12 + (globalSize.value ? 300 : window.innerHeight / 1.5) * Math.sin(-angleSun),
    70, 0, Math.PI * 2
  );
  context.value.shadowBlur = 15;
  context.value.shadowColor = "rgb(235, 235, 235)";
  context.value.fill();
}

// рисуем траву
const printGrass = (i) => {
  // получаем настройки
  let startX = grassRandomPosition[i]
  let grassSize = grassRandomSize[i]
  let grassDeviation = grassRandomDeviation[i][0]

  // проверяем, в какую сторону наклоняется травинка
  if (
    grassDeviation >= grassDeviationMax || 
    grassDeviation <= -grassDeviationMax
  ) grassRandomDeviation[i][1] = !grassRandomDeviation[i][1]

  grassRandomDeviation[i][1] ? 
    grassRandomDeviation[i][0] += grassDeviationSpeed : 
    grassRandomDeviation[i][0] -= grassDeviationSpeed;

  // рисуем травинку
  context.value.beginPath()
    context.value.bezierCurveTo(
      startX, 0,
      startX + 3, grassSize/1.2,
      startX + 6 - grassWidth - grassDeviation * 5, grassSize + (grassDeviation > 0 ? -grassDeviation : grassDeviation)*2,
    );
    context.value.bezierCurveTo(
      startX + 9 - grassDeviation * 2, grassSize/1.2 + grassDeviation/3,
      startX + 12, grassSize/2 + grassDeviation,
      startX + 12, 0
    );
  context.value.closePath();
  context.value.shadowBlur = 5;
  context.value.shadowColor = "rgb(235, 235, 235)";
  context.value.fill();
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
    printText()
    if (globalSize.value) initGrass()
  }
})
</script>
