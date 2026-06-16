import { HomeHero, HomePageRoot, HomeSubtitle, HomeTitle } from './HomePage.styles';

export default function HomePage() {
  return (
    <HomePageRoot>
      <HomeHero>
        <HomeTitle>Ласкаво просимо до Avyro!</HomeTitle>
        <HomeSubtitle>
          Сучасна медична платформа для запису до лікарів, спілкування та ведення профілю.
        </HomeSubtitle>
      </HomeHero>
    </HomePageRoot>
  );
}
