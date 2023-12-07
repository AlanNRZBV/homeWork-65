import React, { FC, useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import { IContentTool, IOptions } from '../../types';

const ContentTool: FC<IContentTool> = ({ pages, onSelect, onSubmit, pageData, onChange }) => {
  const [options, setOptions] = useState<IOptions[]>([]);

  useEffect(() => {
    setOptions(pages.map((page) => ({ value: page.id, label: page.title })));
  }, [pages]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="border border-1 rounded rounded-3 shadow-sm py-3 px-3">
      <h2 className="mb-3">Edit content</h2>
      <Form onSubmit={submitHandler}>
        <Select onChange={onSelect} className="w-25" options={options} autoFocus={true} isSearchable={true} />
        <FormGroup className="mb-3 d-flex flex-wrap">
          <Form.Label className="w-100" htmlFor="title">
            Title
          </Form.Label>
          <Form.Control
            onChange={onChange}
            className="w-50 me-auto"
            type="text"
            name="title"
            id="title"
            value={pageData.title}
            required
          />
          <Button className="me-auto" type="submit" variant="primary">
            Submit
          </Button>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="text">Content</Form.Label>
          <Form.Control
            onChange={onChange}
            as="textarea"
            name="content"
            id="content"
            rows={8}
            value={pageData.content}
            required
          />
        </FormGroup>
      </Form>
    </section>
  );
};

export default ContentTool;
