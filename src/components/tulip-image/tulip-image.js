import TulipImage from './tulip.jpg';
import 'tulip-image.scss';

class TulipImage {
  render() {
    const img = document.createElement('img');
    img.src = TulipImage;
    img.alt = 'Tulip';
    img.classList.add('tulip-image');

    const bodyDomElement = document.querySelector('body');
    bodyDomElement.appendChild(img);
  }
}

export default TulipImage;
