<template>
    <div class="cart cart-start">

        <div class="cart-start__content">

            <h1>{{ printData.value.h1 }}</h1>
            <h2>{{ printData.value.h2 }}</h2>
            <button>Показать больше</button>

        </div>

        <div class="cart-start__backgroung">
            <img
                class="cart-start__backgroung-grass"
                src="~/assets/img/grass.png"
                alt="grass"
            >
            <div class="cart-start__backgroung-trajectory">
                <div class="cart-start__backgroung-sun"></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
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
        this.createdText()
    }, 

    methods: {
        createdText() {
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