class Contact {
  constructor(data) {
    this.name = data.name;
    this.company = data.company || '';
    this.email = data.email;
    this.phone = data.phone;
    this.materialType = data.materialType;
    this.projectType = data.projectType || '';
    this.quantity = data.quantity;
    this.services = data.services || [];
    this.message = data.message;
    this.urgent = data.urgent || false;
    this.timestamp = new Date();
  }
}

module.exports = Contact;