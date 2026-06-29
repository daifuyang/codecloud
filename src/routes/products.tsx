import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Container } from '#/components/ui/index.ts';

export const Route = createFileRoute('/products')({ component: ProductsLayout });

function ProductsLayout() {
  return (
    <Container size="lg" className="py-10 sm:py-14">
      <Outlet />
    </Container>
  );
}
