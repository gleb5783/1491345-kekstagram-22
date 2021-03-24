const EFFECT_NONE = 'none';
const MIN_RANGE = 0;
const START_SLIDER = 80;
const STEP_SLIDER = 1;
const MAX_RANGE = 100;
const previewImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const filterSlider = document.querySelector('.img-upload__effect-level');

const deleteClass = () => {
  for (let className of previewImage.classList) {
    previewImage.classList.remove(className);
  }
}

const effects = {
  none: {

  },

  chrome: {
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => `grayscale(${Number(effectValue)})`,
  },

  sepia: {
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => `sepia(${Number(effectValue)})`,
  },

  marvin: {
    sliderSettings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    getFilterStyle: (effectValue) => `invert(${Number(effectValue)}%)`,
  },

  phobos: {
    sliderSettings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => `blur(${Number(effectValue)}px)`,
  },

  heat: {
    sliderSettings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => `brightness(${Number(effectValue)})`,
  },
}

window.noUiSlider.create(sliderElement, {
  range: {
    min: MIN_RANGE,
    max: MAX_RANGE,
  },
  start: START_SLIDER,
  step: STEP_SLIDER,
  connect: 'lower',
});

const changeFilterSetings = () => {
  for(let effectName in effects) {
    const effectNames = document.querySelector(`#effect-${effectName}`);
    const onApplyFilterEfect = () => {
      deleteClass();
      if (effectName === EFFECT_NONE) {
        effectValue.value = '';
        previewImage.style.filter = '';
        filterSlider.classList.add('hidden');
      }
      else {
        filterSlider.classList.remove('hidden');
        previewImage.classList.add(`effects__preview--${effectName}`);
        sliderElement.noUiSlider.on('update', (values, handle) => {
          effectValue.value = values[handle];
          previewImage.style.filter = effects[effectName].getFilterStyle(effectValue.value);
        });

        sliderElement.noUiSlider.updateOptions(effects[effectName].sliderSettings);
      }
    }
    effectNames.addEventListener('change', onApplyFilterEfect);
  }
}

export{changeFilterSetings};


