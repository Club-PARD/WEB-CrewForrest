import React, { useState } from "react";

import Swal from "sweetalert2";

const Alert = () => {

  const handleButtonClick = () => { 
	Swal.fire({
        title: '크루의 숲',
        text: '양식을 다시 확인해주세요.',
        icon: 'success'
    })
  };

  return (
      <button onClick={handleButtonClick}>
      	클릭!
      </button>
  );
};

export default Alert;