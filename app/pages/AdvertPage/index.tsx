import React from 'react';
import {
  Layout,
  Card,
  Col,
  Button,
  Typography,
  Image,
  Carousel,
  Tag,
  Row,
  Space,
  message,
  Popconfirm,
  PopconfirmProps,
  Flex,
} from 'antd';
import {
  DeleteFilled,
  EditOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { deleteAdvertById, fetchAdvertById } from '../../api/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdvertItem, typeColors } from '../../types/form';
import { ItemTypes } from '../../types/ItemTypes';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AdvertPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery<AdvertItem>({
    queryKey: ['advert-item', id],
    queryFn: () => fetchAdvertById(id as string),
    enabled: !!id,
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      return deleteAdvertById(id as string);
    },
    onSuccess: () => {
      return navigate('/list');
    },
    onError: (err) => {
      console.error('Failed to delete advert', err);
      alert('Failed to delete advert.');
    },
  });

  const confirm: PopconfirmProps['onConfirm'] = () => {
    mutate();
    message.success('Объявление успешно удалено');
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };

  return (
    <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <Content>
        {data ? (
          <div
            style={{
              padding: '20px',
              margin: '0 auto',
              width: '90%',
              maxWidth: 1200,
              boxSizing: 'border-box',
            }}
          >
            <title>{`${data.name} - ${data.type}`}</title>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
              Страница объявления
            </Title>
            <Card
              loading={isLoading}
              style={{
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              <Popconfirm
                title="Удалить объявление"
                description="Вы уверены, что хотите удалить это объявление?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
              >
                <Button
                  style={{
                    marginBlock: '20px',
                    position: 'absolute',
                    right: '20px',
                    top: 0,
                  }}
                  icon={<DeleteFilled />}
                  danger
                >
                  Delete
                </Button>
              </Popconfirm>
              <Row gutter={[54, 24]} align="middle" justify="center">
                {/* Image Section */}
                <Col
                  xs={24}
                  md={10}
                  style={{ textAlign: 'center', marginTop: '20px' }}
                >
                  {data.picture && data.picture.length > 0 ? (
                    <Carousel arrows infinite={false}>
                      {data.picture.map((img, index) => (
                        <Image
                          key={index}
                          src={img?.response?.url || undefined}
                          alt={data.name}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 8,
                            objectFit: 'cover',
                            marginBottom: 8,
                          }}
                          fallback="https://parniangostar.com/_next/static/media/imgFallBack.581a9fe3.png"
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <Image
                      src={
                        'https://parniangostar.com/_next/static/media/imgFallBack.581a9fe3.png'
                      }
                      alt={data.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 8,
                        objectFit: 'cover',
                        marginBottom: 8,
                      }}
                    />
                  )}
                </Col>

                {/* Details Section */}
                <Col xs={24} md={14}>
                  <Title
                    level={3}
                    style={{ marginBottom: 16, textTransform: 'uppercase' }}
                  >
                    {data.name}
                  </Title>
                  <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                    {data.description}
                  </Paragraph>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    {data && (
                      <div style={{ marginBottom: 16 }}>
                        <EnvironmentOutlined /> {data.location}
                      </div>
                    )}
                    {data && data.type === ItemTypes.AUTO && (
                      <div>
                        <Paragraph>Марка: {data.brand}</Paragraph>
                        <Paragraph>Модель: {data.model}</Paragraph>
                        <Paragraph>Год выпуска: {data.year}</Paragraph>
                        <Paragraph>
                          Пробег: {data.mileage ? data.mileage : 'Не указано'}
                        </Paragraph>
                      </div>
                    )}
                    {data && data.type === ItemTypes.REAL_ESTATE && (
                      <div>
                        <Paragraph>
                          Тип недвижимости: {data.propertyType}
                        </Paragraph>
                        <Paragraph>Площадь: {data.area}</Paragraph>
                        <Paragraph>Количество комнат: {data.rooms}</Paragraph>
                        <Paragraph>Цена: {data.price}</Paragraph>
                      </div>
                    )}
                    {data && data.type === ItemTypes.SERVICES && (
                      <div>
                        <Paragraph>Тип услуги: {data.serviceType}</Paragraph>
                        <Paragraph>Опыт работы: {data.experience}</Paragraph>
                        <Paragraph>Стоимость: {data.cost}</Paragraph>
                        <Paragraph>
                          График работы:{' '}
                          {data.workHours ? data.workHours : 'Не указано'}
                        </Paragraph>
                      </div>
                    )}
                    <Flex
                      wrap
                      gap={6}
                      justify="space-between"
                      align="flex-start"
                    >
                      <Tag
                        color={data.type ? typeColors[data.type] : 'default'}
                      >
                        {data.type}
                      </Tag>
                      {data && (
                        <Link
                          style={{ justifySelf: 'flex-end' }}
                          to={`/edit/${data.id}`}
                          state={{ data }}
                        >
                          <Button icon={<EditOutlined />} type="primary">
                            Редактировать
                          </Button>
                        </Link>
                      )}
                    </Flex>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        ) : (
          // Fallback: Full-width responsive 404 image
          <div
            style={{
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <img
              src="https://cdn.dribbble.com/userupload/8726278/file/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif"
              alt="Not Found"
              style={{
                width: '90%',
                height: 'auto',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default AdvertPage;
