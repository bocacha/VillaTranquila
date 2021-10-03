// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// function valuetext(value) {
//   return `${value}°C`;
// }

// export default function RangeSlider() {
//   const [value, setValue] = React.useState([20, 60]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box >
//       <Slider
//         getAriaLabel={() => 'Temperature range'}
//         value={value}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//       />
//     </Box>
//   );
// }

// import React from "react";
// import styles from './Slider.module.css';

// export default function Slider() {

//   // const slideValue = document.querySelector("span");
//   // const inputSlider = document.getElementById("#input");
//   // const onInput = (() => {
//   //   let value = inputSlider.value;
//   //   slideValue.textContent = value;
//   //   slideValue.style.left = (value / 2) + "%";
//   //   slideValue.classList.add("show");
//   // });
//   // inputSlider.oninput = onInput();
//   // const onBlur = (() => {
//   //   slideValue.classList.remove("show");
//   // });
//   // inputSlider.onblur = onBlur();

//   let value;
//   return (
//     <div className={styles.range}>
//       <div class={styles.sliderValue}>
//         <span>5000</span>
//       </div>
//       <div className={styles.field}>
//         <div className={styles.value}>
//           <div id={styles.left}>
//             1500
//           </div>
//         </div>
//         <input id={styles.input} type="range" min="1500" max="8500" value="5000" steps="1" />
//         <div className={styles.value}>
//           <div id={styles.right}>
//             8500
//           </div>
//         </div>
//       </div>
//       <script src="slider.js"></script>

//     </div>
//   )
// }

