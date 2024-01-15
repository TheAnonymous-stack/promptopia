'use client';

import { useState, useEffect } from 'react'; 
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
          <PromptCard 
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}

          />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const fetchPosts= async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      
      
    }
    fetchPosts();

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    //search for matching username, tag, and prompt
    return posts.filter(
      (post) => regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt)
    )
  };

  const handleSearchChange = (e) => {
      setSearchText(e.target.value);
      const newPosts = filterPrompts(e.target.value);
      setSearchedResults(newPosts);
      
    };

    const handleTagClick = (tagName) => {
      setSearchText(tagName);
      const result = filterPrompts(tagName);
      setSearchedResults(result);
    }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"

        />
      </form>
      {searchText ? (
       <PromptCardList 
        data={searchedResults}
        handleTagClick={handleTagClick}
      /> 
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
      
      
    </section>
  )
}

export default Feed