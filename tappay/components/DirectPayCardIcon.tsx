import { Image } from 'react-native';

import { useSetDirectPayTPDCard } from '../hooks';

import cardUnknownIcon from '../images/card_unknown.png';
import cardAmexIcon from '../images/card_amex.png';
import cardMmastercardIcon from '../images/card_mastercard.png';
import cardUnionPayIcon from '../images/card_union_pay.png';
import cardVisaIcon from '../images/card_visa.png';
import cardJcbIcon from '../images/card_jcb.png';

const defaultCardIcon = cardUnknownIcon;
const cardIcon: any = {
  AmericanExpress: cardAmexIcon,
  MasterCard: cardMmastercardIcon,
  UnionPay: cardUnionPayIcon,
  Visa: cardVisaIcon,
  JCB: cardJcbIcon
};

export function DirectPayCardIcon(props: any) {
  const {
    cardNumber: propsCardNumber = '',
    cardType: propsCardType = '',
    ...ortherProps
  } = props;
  const { cardType } = useSetDirectPayTPDCard(propsCardNumber);

  return (
    <Image
      resizeMode="contain"
      {...ortherProps}
      source={cardIcon[cardType] || cardIcon[propsCardType] || defaultCardIcon}
    />
  );
}

// Visa
// 4679270817026199
// 08
// 25
// 081

// MasterCard
// 5520655530886663
// 09
// 25
// 337

// AmericanExpress
// 378593837835717
// 12
// 28
// 7610

// Discover(Unknown)
// 6431216817357054
// 10
// 27
// 420

// RuPay(Unknown)
// 6013714028141743
// 04
// 26
// 935

// Maestro(Unknown)
// 5012311042015871
// 09
// 28
// 600

// China Union Pay(UnionPay)
// 6224314183841750
// 10
// 27
// 048

// JCB
// 3549134477691421
// 07
// 25
// 465
