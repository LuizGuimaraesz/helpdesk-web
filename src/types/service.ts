export type Service = {
  id: string;
  title: string;
  amount: string;
  active: boolean;
};

export type ServicesResponse = {
  services: Service[];
};

export type ServiceResponse = {
  service: Service;
};
