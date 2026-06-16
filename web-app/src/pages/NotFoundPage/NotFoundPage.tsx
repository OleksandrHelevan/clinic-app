import { Link } from 'react-router-dom';
import {
  NotFoundCard,
  NotFoundCode,
  NotFoundPageRoot,
  NotFoundText,
  NotFoundTitle,
} from './NotFoundPage.styles';

export const NotFoundPage = () => (
  <NotFoundPageRoot>
    <NotFoundCard>
      <NotFoundCode>404</NotFoundCode>
      <NotFoundTitle>Сторінку не знайдено</NotFoundTitle>
      <NotFoundText>
        Перейдіть на <Link to="/">головну</Link>
      </NotFoundText>
    </NotFoundCard>
  </NotFoundPageRoot>
);
