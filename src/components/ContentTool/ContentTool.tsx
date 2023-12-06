import React, { FC, useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import { IContentTool, IOptions, IPageContent } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';

const ContentTool: FC<IContentTool> = ({ pages, onSelect, selectedValue }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<IOptions[]>([]);
  const [currentData, setCurrentData] = useState<IPageContent>({
    content: '',
    title: '',
  });

  useEffect(() => {
    setOptions(pages.map((page) => ({ value: page.id, label: page.title })));
  }, [pages]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.put(`pages/${selectedValue}.json`, currentData);
      setCurrentData((prevState) => ({ ...prevState, content: '', title: '' }));
      navigate(`/pages/${selectedValue}`)
    } catch (error) {
      console.log('Caught while form submit: ' + error);
    }
  };

  useEffect(() => {
    pages.map((item) => {
      if (item.id === selectedValue) {
        setCurrentData((prevState) => ({
          ...prevState,
          content: item.content,
          title: item.title,
        }));
      }
    });
  }, [pages, selectedValue]);

  const currentDataChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
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
            onChange={currentDataChanged}
            className="w-50 me-auto"
            type="text"
            name="title"
            id="title"
            value={currentData.title}
            required
          />
          <Button className="me-auto" type="submit" variant="primary">
            Submit
          </Button>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="text">Content</Form.Label>
          <Form.Control
            onChange={currentDataChanged}
            as="textarea"
            name="content"
            id="content"
            rows={8}
            value={currentData.content}
            required
          />
        </FormGroup>
      </Form>
    </section>
  );
};

export default ContentTool;
