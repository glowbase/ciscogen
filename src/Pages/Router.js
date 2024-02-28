import '../App.css';

import { useState, useEffect } from 'react';

import {
  Form,
  InputGroup,
  Container,
  Row
} from 'react-bootstrap';
import Navigation from '../Components/Navigation';

export default function Router() {
  const [cisco_config, setCiscoConfig] = useState("");
  const [hostname, setHostname] = useState("Router");
  const [domain_name, setDomainName] = useState("localhost");

  useEffect(() => {
    const general_config = `
    file prompt quiet
    no ip domain lookup
    ip domain name ${domain_name}
    hostname ${hostname}
  `;
  
  const security_general_config = `
    banner motd #${variables.banner}#
    login block-for ${variables.login_block.for} attempts ${variables.login_block.attempts} within ${variables.login_block.within}
    security passwords min-length ${variables.password_min_length}
  `;
  
  const security_passwords_config = `
    service password-encryption
    enable secret ${variables.ciscoenpass}
    username ${variables.username_loc} secret ${variables.password_loc}
  `;
  
  const console_config = `
    line con 0
    exec-timeout ${variables.timeout}
    logging synchronous
    password ${variables.password_con}
    login
  `;
  
  const vty_config = `
    line vty 0 4
    exec-timeout ${variables.timeout}
    logging synchronous
    ${variables.ssh ? "transport input ssh" : ""}
    login local
  `;
  
  const ssh_config = `
    crypto key generate rsa general-keys modulus ${variables.ssh_mod}
    ip ssh version 2
  `;
  
  const interfaces_config = `
  
  `;
  
  const dhcp_config = `
  
  `;
  
  const routing_config = `
  
  `;
  
  const misc_config = `
  
  `;
  
    setCiscoConfig(`
      ${general_config}
      ${security_general_config}
      ${security_passwords_config}
      ${console_config}
      ${vty_config}
      ${ssh_config}
      ${interfaces_config}
      ${dhcp_config}
      ${routing_config}
      ${misc_config}
    `)
  }, [hostname, domain_name]);

  let variables = {
    banner: "Unauthorised Access is Prohibited",
    login_block: {
      for: 120,
      attempts: 3,
      within: 60
    },
    password_min_length: 10,
    timeout: 60,
    password_en: "ciscoenpass",
    password_con: "ciscoconpass",
    password_loc: "admin1pass",
    username_loc: "admin",
    ssh: false,
    ssh_mod: 1024,
    save_config: true,
  };

  return (
    <>
      <Navigation />
      <Container style={{marginTop: 60, marginBottom: 32,  display: 'flex', flexFlow: 'row'}}>
        <Row style={{flex: 1, marginRight: 24}}>
          <h1>General</h1>
          
          <Form>
            <Form.Label>Host Name</Form.Label>
            <Form.Control type="text" placeholder="Router" className="mb-3" onChange={e => setHostname(e.target.value)} />

            <Form.Label>Domain Name</Form.Label>
            <Form.Control type="text" placeholder="localhost" onChange={e => setDomainName(e.target.value)} />
          </Form>

          <h1>Security</h1>
          <h2>General</h2>

          <Form>
            <Form.Label>Banner</Form.Label>
            <Form.Control type="text" placeholder="Unauthorised Access is Prohibited" className="mb-3" />

            <Form.Label>Login Blocking</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>Block For</InputGroup.Text>
              <Form.Control placeholder="120" />
              <InputGroup.Text>Attempts</InputGroup.Text>
              <Form.Control placeholder="3" />
              <InputGroup.Text>Within</InputGroup.Text>
              <Form.Control placeholder="60" />
            </InputGroup>

            <Form.Label>Timeout</Form.Label>
            <Form.Control type="text" placeholder="60" />
          </Form>

          <h2>Passwords</h2>

          <Form>
            <Form.Label>Console</Form.Label>
            <Form.Control type="text" placeholder="ciscoconpass" className="mb-3" />

            <Form.Label>Global Configuration</Form.Label>
            <Form.Control type="text" placeholder="ciscoenpass" className="mb-3" />

            <Form.Label>Local Username</Form.Label>
            <Form.Control type="text" placeholder="admin" className="mb-3" />

            <Form.Label>Local Password</Form.Label>
            <Form.Control type="text" placeholder="admin1pass" />
          </Form>

          <h1>Console</h1>

          <h1>VTY Lines</h1>

          <h1>SSH</h1>

          <h1>Interfaces</h1>

          <h1>DHCP</h1>

          <h1>Routing</h1>

          <h1>Miscellaneous</h1>
      </Row>
      <Row style={{flex: 1}}>
        <textarea readOnly value={cisco_config} />
      </Row>
    </Container>
    </>
  )
}