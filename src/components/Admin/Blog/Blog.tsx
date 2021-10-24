import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import Pagination from '../Helpers/Pagination/Pagination';
import { BlogWrapper, SearchWrapper, ContentWrapper } from './BlogStyles';


const Blog: React.FC = () => {
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState([]);

  const contents = [
    {
      id: 1,
      title: 'O que é email marketing',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.'
    },
    {
      id: 2,
      title: 'O que é email marketing2',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor'
    },
    {
      id: 3,
      title: 'O que é email marketing3',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor'
    },
    {
      id: 4,
      title: 'O que é email marketing4',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor'
    },
    {
      id: 5,
      title: 'O que é email marketing5',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor'
    },
    {
      id: 6,
      title: 'O que é email marketing6',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor'
    },
    {
      id: 7,
      title: 'O que é email marketing',
      text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.'
    },
  ]

  useEffect(() => {
    const findContents = contents.filter(({ title }) => (
      title.toLocaleLowerCase().includes(search)
    ));
    setSearchFilter(findContents)
  }, [search, setSearch]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentContents =
    searchFilter.length >= 1
      ? searchFilter?.slice(indexOfFirstPost, indexOfLastPost)
      : contents.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  return (
    <BlogWrapper>
      <SearchWrapper>
        <div className="form-search">
          <FiSearch />
          <input
            type="text"
            placeholder="O que você procura?"
            value={search}
            onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <button>Pesquisar</button>
      </SearchWrapper>
      <ContentWrapper>
        {currentContents.map(content => (
          <div className="content-card" key={content.id}>
            <h1>{content.title}</h1>
            <p>{content.text}</p>
          </div>
        ))}
      </ContentWrapper>
      <div>
        <Pagination
          itemsTotalPerPage={itemsPerPage}
          totalItems={contents.length}
          paginate={paginate}
        />
      </div>
    </BlogWrapper>
  )
}

export default Blog;