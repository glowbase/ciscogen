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
  const [banner, setBanner] = useState("Unauthorised Access is Prohibited!");
  const [login_block_for, setLoginBlockFor] = useState(120);
  const [login_block_attempts, setLoginBlockAttempts] = useState(3);
  const [login_block_within, setLoginBlockWithin] = useState(60);
  const [password_min_length, setPasswordMinLength] = useState(10);
  const [password_global_config, setPasswordGlobalConfig] = useState("ciscoenpass");
  const [password_console, setPasswordConsole ] = useState("ciscoconpass");
  const [username_local, setUsernameLocal] = useState("admin");
  const [password_local, setPasswordLocal] = useState("admin1pass");
  const [timeout, setTimeout] = useState(60);
  const [ssh, setSsh] = useState(true);
  const [ssh_mod, setSshMod] = useState(1024);
  const [save_config, setSaveConfig] = useState(true);

  useEffect(() => {
    setCiscoConfig(`
    file prompt quiet
    no ip domain lookup
    ip domain name ${domain_name}
    hostname ${hostname}
    
    banner motd #${banner}#
    login block-for ${login_block_for} attempts ${login_block_attempts} within ${login_block_within}
    security passwords min-length ${password_min_length}
    
    service password-encryption
    enable secret ${password_global_config}
    username ${username_local} secret ${password_local}
    
    line con 0
    exec-timeout ${timeout}
    logging synchronous
    password ${password_console}
    login
    
    line vty 0 4
    exec-timeout ${timeout}
    logging synchronous
    ${ssh ? "transport input ssh" : ""}
    login local
    
    crypto key generate rsa general-keys modulus ${ssh_mod}
    ip ssh version 2

    ${save_config ? "copy run start" : ""}
  `)
  }, [
    hostname,
    domain_name,
    banner,
    login_block_for,
    login_block_within,
    login_block_attempts,
    password_min_length,
    password_global_config,
    username_local,
    password_local,
    timeout,
    password_console,
    ssh,
    ssh_mod,

  ]);

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