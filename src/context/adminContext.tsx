import {createContext, useState, useEffect} from 'react';
import {setCookie, parseCookies} from 'nookies';
import Router from 'next/router';
import {getAPIClient} from '../services/api';
import {signInRequest} from '../services/auth';

type User = {
  id: number;
  name: string;
  email: string;
  document: string;
  customerId: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<{user: any; token: string}>;
};

interface ProductProps {
  name: string;
  description: string;
}

interface SubscriptionProps {
  cancel_at: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  current_period_start: number;
  plan: {
    amount: number;
  };
}

interface PaymentProps {
  card: {
    brand: string;
    last4: string;
  };
  billing_details: {
    name: string;
    email: string;
  };
}

interface MenuContextProps extends AuthContextType {
  route: string;
  token: string;
  setRoute(value: string): void;
  product: ProductProps;
  payment: PaymentProps;
  subscription: SubscriptionProps;
}

export const AdminContext = createContext<MenuContextProps>(
  {} as MenuContextProps,
);

export const AdminProvider = ({children}: {children: any}) => {
  const [route, setRoute] = useState('' === '' ? 'painel' : '');

  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>('');
  const [subscription, setSubscription] = useState<SubscriptionProps>(
    {} as SubscriptionProps,
  );
  const [product, setProduct] = useState<ProductProps>({} as ProductProps);
  const [payment, setPayment] = useState<PaymentProps>({} as PaymentProps);

  const isAuthenticated = !!user;

  useEffect(() => {
    const {'sendway.token': tokenCookie} = parseCookies();
    const userData = JSON.parse(
      JSON.stringify(localStorage.getItem('sendway.user')),
    );

    if (tokenCookie) {
      const subscriptionData = JSON.parse(
        localStorage.getItem('sendway.subscription') as string,
      );

      if (subscriptionData) {
        setProduct(subscriptionData.product);
        setPayment(subscriptionData.payment);
        setSubscription(subscriptionData.plan);
      }

      const tokenStorage = localStorage.getItem('sendway.token');
      setUser(JSON.parse(userData));
      setToken(tokenStorage as string);
    }
  }, [route]);

  async function signIn({email, password}: SignInData) {
    const {token, user} = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'sendway.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    getAPIClient().defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    Router.push(`/admin/?id=${user.id}`);
    return {user, token};
  }

  return (
    <AdminContext.Provider
      value={{
        route,
        setRoute,
        signIn,
        isAuthenticated,
        user,
        token,
        payment,
        product,
        subscription,
      }}>
      {children}
    </AdminContext.Provider>
  );
};
