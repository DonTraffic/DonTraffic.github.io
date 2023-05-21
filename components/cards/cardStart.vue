<template>
    <div class="card card-start" id="cardStart">

        <div class="card__content card-start__content">

            <h1 class="text-shadow">{{ printData.value.h1 }}</h1>
            <h2 class="text-shadow">{{ printData.value.h2 }}</h2>
            <button @click="showMore">Показать больше</button>

        </div>

        <div class="card__background card-start__background">
            <img
                class="card-start__background-grass"
                src="~/assets/img/grass.png"
                alt="grass"
            >
            <div class="card-start__background-trajectory">
                <div class="card-start__background-sun icon-sun"></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'cardStart',
    data() {
        return {
            printData: {
                text: {
                    china: {
                        h1: '唐特拉菲克',
                        h2: '如果你编程，那么用爱',
                    },
                    rus: {
                        h1: 'DonTraffic',
                        h2: 'Если программировать, то с любовью',
                    },
                },
                value: {
                    h1: '',
                    h2: '',
                },
                setting: {
                    interval: 100,
                    intervalSet: 0,
                }
            },

        }
    },

    mounted() {
        this.printText()
    }, 

    methods: {
        showMore() {
            document.getElementById('cardMenu').classList.remove('card__position-bottom')
            setTimeout(() => {this.$el.parentNode.removeChild(this.$el)}, 2000)
        },

        printText() {
            let dataText = this.printData.text
            let dataValue = this.printData.value
            for (let countLang = 0; countLang < Object.keys(dataText).length; countLang++) {
                let langKey = Object.keys(dataText)[countLang]
                setTimeout(()=> {
                    for (let countText = 0; countText < Object.keys(dataText[langKey]).length; countText++) {
                        let textKey = Object.keys(dataText[langKey])[countText]
                        for (let countLetter = 0; countLetter < dataText[langKey][textKey].length; countLetter++) {
                            setTimeout(() =>{
                                dataValue[textKey].length > countLetter ?
                                    dataValue[textKey] = dataValue[textKey].replace(dataValue[textKey][countLetter], dataText[langKey][textKey][countLetter]) :
                                    dataValue[textKey] += dataText[langKey][textKey][countLetter];
                            }, this.printData.setting.interval += 100)
                        }
                    }
                }, this.printData.setting.interval += this.printData.setting.intervalSet)
                this.printData.setting.intervalSet = 500
            }
        },

    }

}
</script>