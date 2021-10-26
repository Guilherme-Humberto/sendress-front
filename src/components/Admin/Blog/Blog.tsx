import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import Pagination from '../Helpers/Pagination/Pagination';
import { contents } from '../utils/contentBlog';
import { BlogWrapper, SearchWrapper, ContentWrapper } from './BlogStyles';

const Blog: React.FC = () => {
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState([]);

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