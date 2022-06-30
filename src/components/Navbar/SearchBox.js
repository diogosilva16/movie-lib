import React, { useState, useRef, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Search from "@mui/icons-material/Search";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background-color: transparent;
  border: 1px solid black;
  width: ${(props) => (props.state ? "15rem" : "2rem")};
  cursor: ${(props) => (props.state ? "auto" : "pointer")};
  padding: 1.5rem;
  @media (min-width: 769px){
    width: ${(props) => (props.state ? "30rem" : "2rem")};
  }
  @media (max-width: 768px){
    padding: 1rem;
  }
  height: 2rem;
  outline: none;
  border-radius: 10rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  background-color: transparent;
  width: 100%;
  margin-left: ${(props) => (props.state ? "1rem" : "0rem")};
  color: black;
  border: none;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: var(--text-color);
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${(props) => (props.state ? "auto" : "none")};
  cursor: ${(props) => (props.state ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
`;

const SearchBox = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [state, setState] = useState(false);

  const node = useRef();
  const inputFocus = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // cleanup event when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setState(false);
  };

  function onFormSubmit(e) {
    e.preventDefault();
    if (input.length === 0) {
      return;
    }
    setInput("");
    setState(false);
    navigate(`/search/${input}`);
  }

  return (
    <Form
      state={state}
      onClick={() => {
        setState(true);
        inputFocus.current.focus();
      }}
      onSubmit={onFormSubmit}
      ref={node}
    >
      <Button type="submit" state={state}>
        <Search />
      </Button>
      <Input
        onChange={(e) => setInput(e.target.value)}
        ref={inputFocus}
        value={input}
        state={state}
        placeholder="Search for a movie..."
      />
    </Form>
  );
};

export default SearchBox;
