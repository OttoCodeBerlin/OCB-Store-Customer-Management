import axios from 'axios'

class AuthService {
  constructor(url) {
    this.service = axios.create({
      baseURL: url,
      withCredentials: true
    })
  }

  signup = body => {
    const { service } = this;
    const path = '/auth/signup';
    return service.post(path, body);
  }

  login = body => {
    const { service } = this;
    const path = '/auth/login';
    return service.post(path, body);
  }

  add_customer = body => {
      const { service } = this;
      const path = '/auth/add_customer';
      return service.post(path, body);
    }

    modify_customer = body => {
      const { service } = this;
      const path = '/auth/modify_customer';
      return service.post(path, body);
    }

    modify_customer_image_one = body => {
      const { service } = this;
      const path = '/auth/modify_customer_image_one';
      return service.post(path, body);
    }

    modify_customer_image_two = body => {
      const { service } = this;
      const path = '/auth/modify_customer_image_two';
      return service.post(path, body);
    }

    delete_customer = (body, id)=> {
      const { service } = this;
      const path = '/auth/delete_customer/'+id;
      return service.post(path, body);
    }

    resend_customer = (body, id)=> {
      const { service } = this;
      const path = '/auth/resend_customer/'+id;
      return service.post(path, body);
    }
 
  edit = body => {
    const { service } = this;
    const path = '/auth/edit';
    return service.post(path, body);
  }

  logout = () => {
    const { service } = this;
    const path = '/auth/logout';
    return service.get(path);
  }

  loggedin = () => {
    const { service } = this;
    const path = '/auth/loggedin';
    return service.get(path);
  }
}

const auth = new AuthService('http://localhost:5000');

export default auth;