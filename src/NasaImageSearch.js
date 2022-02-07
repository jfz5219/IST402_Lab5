import { html, css, LitElement } from 'lit';
import '@lrnwebcomponents/accent-card/accent-card.js';


export class NasaImageSearch extends LitElement {

  static get properties() {
    return {
      imageData: {type: Array},
      term: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.imageData = [];

    // Tried putting this.apiURL in fetch but since my input form disappear, the term value
    // can't be anything else besides the initialized term("moon").

    // this.term = "moon";
    // this.apiURL = 'https://images-api.nasa.gov/search?q=' + this.term + '&media_type=image';

  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {

      //When this "if statement" was not added, the updated functio kept running.
      if (propName === 'term' && this[propName]) {
        this.getData();
      }
    });
  }

  render() {
    
    //Got reference from https://webcomponents.psu.edu/styleguide/?path=/story/layout-card--accent-card-story
    // & https://github.com/elmsln/ip-project/blob/master/src/CourseDates.js
      return html` 
        ${this.imageData.map(
          item => html`
          <accent-card image-src="${item.image}" accent-color="blue" dark horizontal style="max-width:600px;">
            <div slot="heading">${item.title}</div>
            <div slot="content">${item.description}</div>
          </accent-card>

          `)}
    
    `;

  }


  async getData() {

    fetch("https://images-api.nasa.gov/search?q=" + this.term + "&media_type=image")
      .then(response =>
        response.json()
      )
      .then(data => {

        this.imageData =[];

        for (let i = 0; i < data.collection.items.length; i++) {

          //Had to add a try-catch because I was getting some error from the server
          try {

          const eventInfo = {
            image: data.collection.items[i].links[0].href.replace(/\s/g,"%20"),
            title: data.collection.items[i].data[0].title,
            description: data.collection.items[i].data[0].description,           
          };

          this.imageData.push(eventInfo);
          // console.log(eventInfo);
        }
          catch(err) {
            console.log("Error" + err);
              }

        }
      });

    }
  
}

          

  


