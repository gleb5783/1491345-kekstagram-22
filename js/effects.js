const EFFECT_NONE = 'none';
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
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

const changeFilterSetings = () => {
  for(let effectName in effects) {
    const effectNames = document.querySelector(`#effect-${effectName}`);
    const applyFilterEfect = () => {
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

    if (document.querySelector('body').classList.contains('modal-open')) {
      effectNames.removeEventListener('change', applyFilterEfect);
    }
    else {
      effectNames.addEventListener('change', applyFilterEfect);
    }
  }
}

export{changeFilterSetings};


