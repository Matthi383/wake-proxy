# wake-proxy

wake-proxy is a small, lightweight Wake-on-LAN (WOL) proxy service designed to remotely power on devices inside a private network (e.g. home lab servers, NAS, or services like Immich) and optionally forward requests once the target system is online.

It is especially useful for setups where servers are kept in standby and only started on demand.

---

## 🚀 Features

- Wake-on-LAN trigger via HTTP request
- Optional reverse proxy integration
- Health-check for target systems
- Simple deployment via Docker
- Extensible service routing (phase-based architecture)
- Designed for home labs and low-power infrastructures

---

## 🧩 Use Case Example

- A server hosting a service (e.g. Immich) is powered off to save energy
- User opens photo app remotely
- wake-proxy sends WOL packet to server
- Server boots up
- Request is forwarded once service is ready
- The user experiences only a short initial delay while the service starts up; if a timeout occurs, a simple retry is sufficient.

---

## 🧱 Project Phases

### Phase 1 – Core WOL Proxy (current)
_Currently in development_
- Basic HTTP API
- MAC address registry
- Wake-on-LAN implementation
- Simple status endpoint

### Phase 2 – Service Awareness
- Health checks per target service
- Configurable wait strategies
- Retry logic for service availability

### Phase 3 – Reverse Proxy Integration
- Request forwarding after wake-up
- Path-based routing
- Support for multiple services

### Phase 4 – UI & Observability
- Simple dashboard
- Device status overview
- Logs & metrics

---

## ⚙️ Configuration Example

```yaml
devices:
  immich:
    mac: "AA:BB:CC:DD:EE:FF"
    ip: "192.168.1.50"
    port: 3001
    healthcheck: "http://192.168.1.50:3001/api/health"
