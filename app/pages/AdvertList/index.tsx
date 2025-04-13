import React, { useState } from 'react';
import { Button, Card, Flex, Image, List, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { useQuery } from '@tanstack/react-query';
import { fetchAdverts } from '../../api/api';
import { Auto, BaseFormData, RealEstate, Services } from '../../types/form';
import { ItemTypes } from '../../../server/ItemTypes';

interface RealEstateAdvert extends BaseFormData, RealEstate {
  type: 'Недвижимость';
}

interface AutoAdvert extends BaseFormData, Auto {
  type: 'Авто';
}

interface ServicesAdvert extends BaseFormData, Services {
  type: 'Услуги';
}

type AdvertItem = RealEstateAdvert | AutoAdvert | ServicesAdvert;

type PaginationPosition = 'top' | 'bottom' | 'both';
type PaginationAlign = 'start' | 'center' | 'end';

const typeColors = {
  [ItemTypes.REAL_ESTATE]: 'red',
  [ItemTypes.AUTO]: 'blue',
  [ItemTypes.SERVICES]: 'green',
};

const AdvertListing: React.FC = () => {
  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['items'],
    queryFn: fetchAdverts,
  });

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '20px auto' }}>
      <Flex wrap justify="space-between">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          Список объявлений
        </Title>
        <Link
          to={'/form'}
          style={{ marginBottom: 20, display: 'block', textAlign: 'center' }}
        >
          <Button
            style={{ backgroundColor: '#12b004' }}
            type="primary"
            size="large"
          >
            Разместить объявление
          </Button>
        </Link>
      </Flex>
      <List
        loading={isLoading}
        pagination={{ position, align, pageSize: 3 }}
        dataSource={data}
        renderItem={(item: AdvertItem, index) => {
          console.log(item);
          return (
            <List.Item style={{ padding: '10px 0' }}>
              <Card loading={loading} style={{ width: '100%' }}>
                <Flex align="center" gap={16}>
                  <div
                    style={{
                      width: 120,
                      borderRadius: 10,
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Placeholder for image */}
                    <Image
                      width={'100%'}
                      height={'auto'}
                      style={{ borderRadius: 10 }}
                      src={
                        item.picture
                          ? item.picture.length > 0
                            ? item.picture[0]?.response?.url || ''
                            : ''
                          : ''
                      }
                      fallback="https://parniangostar.com/_next/static/media/imgFallBack.581a9fe3.png"
                    />
                  </div>
                  <Flex
                    vertical
                    style={{ width: '100%', overflow: 'hidden' }}
                    justify="space-between"
                  >
                    <Title
                      level={5}
                      style={{
                        marginBottom: 5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </Title>
                    <Paragraph
                      ellipsis={{ rows: 2 }}
                      style={{
                        marginBottom: 10,
                        color: !item.description ? 'gray' : undefined,
                      }}
                    >
                      {item.description || 'No description available.'}
                    </Paragraph>
                    <Flex justify="space-between" align="center">
                      <Tag color={typeColors[item.type] || 'default'}>
                        {item.type}
                      </Tag>
                      <Link to={`/item/${index}`}>
                        <Button
                          style={{ backgroundColor: '#12b004' }}
                          type="primary"
                          size="middle"
                        >
                          Открыть
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default AdvertListing;
