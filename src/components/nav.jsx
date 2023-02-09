import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;

  color: ${(props) => props.color || "gray"};
  background: ${(props) => props.background || "white"};
`;

function Button({ children, color, background }) {
    return (
        <StyledButton color={color} background={background} Î>
            {children}
        </StyledButton>
    );
}

const navLi = styled.li`
            background-color: #FFDAB9;
			width: 150px;
			list-style-type: none;
			margin: 0;
			padding: 0;
`;