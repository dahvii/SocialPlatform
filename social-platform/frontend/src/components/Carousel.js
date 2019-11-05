import React, { Component }  from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEC3dTEayqWyT2Nn-ncxSLOqJjwLDdclA9KjJNv4y6xownhx_C&s',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: 'https://d1bbcn6xx8qu3z.cloudfront.net/sites/default/files/styles/puppy_thumb_fixed/public/import_5bc78e4b0c3d02.20920796-1277645504%5B1%5D.jpg?itok=j4AVp_EM',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

export default class Carousel extends Component {
    render(){
        return (
            <UncontrolledCarousel items={items} />
        )
    }
}
