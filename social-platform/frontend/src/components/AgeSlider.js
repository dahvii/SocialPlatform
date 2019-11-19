import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


export default function AgeSlider(props) {
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range)
  const [value, setValue] = useState([props.startValue, props.endValue]);

  useEffect(() => {
    setValue([props.startValue, props.endValue]);
  }, [props]);


  const onSliderChange = (value) => {
    setValue(value);
    props.sliderCallback(value);
  }
  return (
    <div>
      <Range className="sliderWidth" min={18} max={60} allowCross={false} value={value} onAfterChange={onSliderChange} onChange={onSliderChange} tipFormatter={value => `${value}`} />
    </div>
  );

}
