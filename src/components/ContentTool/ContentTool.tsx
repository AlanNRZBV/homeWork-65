import React, { FC, useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import Select from 'react-select';
import { IContentTool, IOptions } from "../../types";

const ContentTool: FC<IContentTool> = ({pages}) => {


  const [options, setOptions]=useState<IOptions[]>([])

  useEffect(() => {
    console.log(pages)
    setOptions(pages.map((page) => ({ value: page.id, label: page.title })));
  }, [pages]);
  const submitHandler=() => {
    console.log('Form submitted')
  }

  const changeHandler=()=>{
    console.log('changed')
  }

  return (
    <section className="border border-1 rounded rounded-3 shadow-sm py-3 px-3">
      <h2 className="mb-3">Add post</h2>
      <Form onSubmit={submitHandler}>
        <Select onChange={changeHandler} className="w-25" options={options} autoFocus={true}/>
        <FormGroup className="mb-3 d-flex flex-wrap">
          <Form.Label className="w-100" htmlFor="title">
            Author
          </Form.Label>
          <Form.Control
            onChange={changeHandler}
            className="w-50 me-auto"
            type="text"
            name="author"
            id="author"
            value={1}
            required
          />
          <Button className="me-auto" type="submit" variant="primary">
            Submit
          </Button>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="text">Text</Form.Label>
          <Form.Control
            onChange={changeHandler}
            as="textarea"
            name="text"
            id="text"
            rows={8}
            value={2}
            required
          />
        </FormGroup>
      </Form>
    </section>
  );
};

export default ContentTool;