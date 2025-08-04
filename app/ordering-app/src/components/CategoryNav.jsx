import React from 'react';

const CategoryNav = ({ categories }) => {
  return (
    <nav>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <a href={`#${category.id}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNav;
