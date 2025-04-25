import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Image,
  List,
  Select,
  SelectProps,
  Tag,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { useQuery } from '@tanstack/react-query';
import { fetchAdverts } from '../../api/api';
import { AdvertItem, typeColors } from '../../types/form';
import { ItemTypes } from '../../types/ItemTypes';
import Search, { SearchProps } from 'antd/es/input/Search';

type PaginationPosition = 'top' | 'bottom' | 'both';
type PaginationAlign = 'start' | 'center' | 'end';

const AdvertListing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, data } = useQuery({
    queryKey: ['items'],
    queryFn: fetchAdverts,
  });

  const ReversedData = useMemo(() => {
    if (data) {
      return [...data].reverse();
    } else return undefined;
  }, [data]);

  const options: SelectProps['options'] = [
    {
      label: ItemTypes.AUTO,
      value: ItemTypes.AUTO,
    },
    {
      label: ItemTypes.REAL_ESTATE,
      value: ItemTypes.REAL_ESTATE,
    },
    {
      label: ItemTypes.SERVICES,
      value: ItemTypes.SERVICES,
    },
  ];

  const [value, setValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value.toLowerCase());
  };

  const filteredData = useMemo(() => {
    if (!ReversedData) return [];

    let filtered = ReversedData;

    if (value && value.length > 0) {
      filtered = filtered.filter((item) => value.includes(item.type));
    }

    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
    }

    return filtered;
  }, [ReversedData, value, searchValue]);

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '20px auto' }}>
      <title>Список объявлений</title>
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
      <Flex
        justify="flex-end"
        align="flex-start"
        gap={6}
        style={{ width: '100%' }}
        wrap
      >
        <Flex gap={6} wrap justify="flex-end" align="flex-start">
          <Search
            placeholder="Поиск по названию"
            allowClear
            onChange={(e) => onSearch(e.target.value)}
            onSearch={onSearch}
            style={{
              minWidth: 300,
              maxWidth: 300,
              marginLeft: 'auto',
              flexShrink: 1,
              flex: 1,
            }}
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Фильтры"
            onChange={handleChange}
            style={{ minWidth: 300, maxWidth: 500 }}
            options={options}
          />
        </Flex>

        <Flex gap={6} wrap justify="flex-end">
          {value.map((e) => (
            <Select key={e} placeholder={e} style={{ width: 150 }} />
          ))}
        </Flex>
      </Flex>
      <List
        loading={isLoading}
        pagination={{ position: 'bottom', align: 'center', pageSize: 5 }}
        dataSource={filteredData}
        renderItem={(item: AdvertItem) => {
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
                      style={{ borderRadius: 10, objectFit: 'cover' }}
                      src={
                        item.picture
                          ? item.picture.length > 0
                            ? item.picture[0]?.response?.url || ''
                            : undefined
                          : undefined
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
                      <Tag
                        color={item.type ? typeColors[item.type] : 'default'}
                      >
                        {item.type}
                      </Tag>
                      <Link to={`/item/${item.id}`}>
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
