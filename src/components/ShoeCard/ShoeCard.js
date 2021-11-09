import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const FLAG_STYLES = {
  sale: {
    value: 'Sale',
    '--bg-color': COLORS.primary,
  },
  new: {
    value: 'Just released!',
    '--bg-color': COLORS.secondary,
  },
  default: {
    value: 'default',
    '--display': 'none',
  },
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variantStyles = typeof salePrice === 'number'
    ? FLAG_STYLES.sale
    : isNewShoe(releaseDate)
      ? FLAG_STYLES.new
      : FLAG_STYLES.default

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <ShoeFlag style={variantStyles}>
            {variantStyles.value}
          </ShoeFlag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const ShoeFlag = styled.label`
  position: absolute;
  top: 12px;
  right: -4px;
  font-size: ${14/16}rem;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  padding: 9px 10px;
  border-radius: 2px;
  pointer-events: none;
  display: var(--display);
  background-color: var(--bg-color);
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
