import { useState } from 'react';
import './App.css';
import { Table, Button,  Form, Input, Space } from 'antd';
import { useSelector } from 'react-redux';
import { New } from './interface';
import { useDispatch } from 'react-redux';
import { addNewNews, deleteNews, editNews } from './redux/features/news/newsSlice';
function App() {


    const [status, setStatus] = useState<string>('create');
    const [timeObj, setTimeObj] = useState<New>({
        title: '',
        description: ''
    });

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const data: any = useSelector<New[]>((state:any) => state.news.value);
    const dispatch = useDispatch();

    


    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                  
                    <a href='/#'  onClick={() => startEdit(record)}>Редактировать</a>
                    <a   href='/#' onClick={() => dispatch(deleteNews(record))}>Удалить</a>
                </Space>
            ),
        },
    ];


    const onAdd = () => {
        if(title.length > 0 && description.length > 0) {
            dispatch(addNewNews({title, description}))
            setTitle('')
            setDescription('')
        } else {
            alert("Заполните все поля")
        }
        }

    const cancelEdit = () => {
        setTitle('')
        setDescription('')
        setTimeObj({
            title: '',
            description: ''
        });
    }

    const startEdit = (item: New) => {
        setTimeObj(item);
        setStatus('edit');
        setTitle(item.title);
        setDescription(item.description);
    }

    const onEdit =() => {
        dispatch(editNews({
            oldTitle: timeObj.title,
            title,
            description
        }))

        cancelEdit()
    }
  

    return (

        <div style={{
            display: 'block', width: 700, padding: 30, margin: '0 auto'
        }}>

            <Form>
                <Form.Item label="Добавить новость" name="layout">
                </Form.Item>
                <Form.Item>
                    <Input placeholder="Наименование" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item>
                {status === 'edit' ?   <Button type="primary" onClick={onEdit}>Редактировать</Button>:   <Button type="primary" onClick={onAdd}>Добавить</Button>}
                   {status === 'edit' && <a  href='/#' onClick={() => cancelEdit()}>Отменить редактирование</a>}
                </Form.Item>
            </Form>

          <Table dataSource={data} columns={columns} />
        </div>
    );
}

export default App;
