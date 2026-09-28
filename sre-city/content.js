/* Replace or expand this file when you are ready to add personal stories and links. */
window.CITY_CONTENT = {
  name: 'Piyush Joshi',
  role: 'Senior Platform & Site Reliability Engineer',
  years: '12+ years',
  intro: 'I build the invisible systems that keep a city awake.',
  email: '',
  linkedin: '',
  github: '',
  note: 'The city and its incidents are fictional illustrations. Career details reflect the profile supplied for this site.',
  districts: [
    {
      id: 'platform', number: '01', short: 'Compute Quarter',
      eyebrow: 'KUBERNETES · BARE METAL · VIRTUALIZATION',
      title: 'The Compute Quarter',
      subtitle: 'Where workloads find a place to live.',
      description: 'Platforms should remain predictable when nodes fail, workloads move, and demand changes. My work spans managed and on-prem Kubernetes, bare metal, KubeVirt, and GitOps-driven operations.',
      capabilities: ['Kubernetes & AKS', 'Bare metal', 'KubeVirt', 'FluxCD', 'ArgoCD', 'Helm', 'Calico', 'Kyverno'],
      story: 'At NVIDIA, my current focus includes Kubernetes, bare metal infrastructure, KubeVirt, and FluxCD. Earlier platform work included scheduling, network policy, traffic ingress, and workload resilience across production environments.',
      principle: 'Make failure domains visible before a failure makes them obvious.',
      signal: 'Node health',
      details: [
        ['Placement', 'Topology spread, anti-affinity, and disruption budgets help workloads survive planned and unplanned node changes.'],
        ['Delivery', 'GitOps and progressive rollout patterns make change reviewable and recovery less surprising.'],
        ['Boundaries', 'Namespace isolation, RBAC, and network policy make the platform easier to reason about.']
      ]
    },
    {
      id: 'edge', number: '02', short: 'Edge Exchange',
      eyebrow: 'DNS · ROUTING · SECURITY',
      title: 'The Edge Exchange',
      subtitle: 'Every visitor needs a safe, fast route in.',
      description: 'Global traffic has to reach the right place with low latency and predictable behavior. I have worked with DNS-based traffic steering, ingress, edge routing, and security controls for large-scale platforms.',
      capabilities: ['DNS architecture', 'Global traffic management', 'Anycast concepts', 'Traefik', 'TLS automation', 'WAF', 'Rate limiting', 'DDoS mitigation'],
      story: 'At Akamai, I contributed to edge cloud architecture and operated Kubernetes platforms for latency-sensitive workloads. This included Traefik ingress, cert-manager, traffic steering, and collaboration around Bot Manager and Kona Site Defender.',
      principle: 'A good route is fast, safe, and has a known fallback.',
      signal: 'Request flow',
      details: [
        ['Steering', 'DNS and edge routing place requests near healthy capacity.'],
        ['Entry', 'Ingress middleware, canaries, and TLS controls shape north-south traffic.'],
        ['Protection', 'WAF, bot controls, and rate limits reduce avoidable pressure on applications.']
      ]
    },
    {
      id: 'data', number: '03', short: 'Data Vault',
      eyebrow: 'POSTGRESQL · ORACLE · RECOVERY',
      title: 'The Data Vault',
      subtitle: 'The foundations are only strong if they can recover.',
      description: 'Stateful systems demand more than uptime. I have operated PostgreSQL and Oracle as reliability-critical services, with attention to performance, backups, replication, and disaster recovery.',
      capabilities: ['PostgreSQL', 'Oracle VLDB', 'Query tuning', 'Indexing', 'Replication', 'Backup & restore', 'RTO / RPO', 'Kafka & CDC'],
      story: 'My database reliability work includes performance baselines, saturation signals, SQL and I/O tuning, workload isolation, and tested recovery strategies. I have also worked with Kafka, Kafka Connect, and Debezium CDC patterns.',
      principle: 'A backup is a promise; a restore test is evidence.',
      signal: 'Recovery readiness',
      details: [
        ['Performance', 'Baselines and early-warning signals reveal saturation before users report it.'],
        ['Continuity', 'Replication and recovery design connect data safety to service objectives.'],
        ['Proof', 'Restore exercises validate assumptions about RTO and RPO.']
      ]
    },
    {
      id: 'operations', number: '04', short: 'Control Tower',
      eyebrow: 'SLOS · INCIDENTS · AUTOMATION',
      title: 'The Control Tower',
      subtitle: 'See the city clearly. Respond with calm.',
      description: 'Reliability is a practice of measuring user impact, making good decisions under pressure, and removing repetitive work. I design SLOs and alerts, lead incident response, and turn recurring problems into durable improvements.',
      capabilities: ['SLI / SLO design', 'Error budgets', 'Incident response', 'Postmortems', 'Prometheus', 'Grafana', 'VictoriaMetrics', 'Terraform'],
      story: 'Across platform, edge, and database environments, I have worked on on-call response, root-cause analysis, runbooks, capacity planning, and automation-first process improvement. I also work directly with stakeholders to connect engineering decisions to customer needs.',
      principle: 'Measure what users feel, then automate what repeatedly distracts us.',
      signal: 'User impact',
      details: [
        ['Observe', 'Service indicators and focused alerts show meaningful degradation.'],
        ['Respond', 'Runbooks, incident roles, and clear communication shorten uncertainty.'],
        ['Improve', 'Postmortems and automation turn incidents into fewer repeat pages.']
      ]
    }
  ],
  career: [
    { company: 'NVIDIA', period: 'Current', description: 'Kubernetes, bare metal, KubeVirt, and FluxCD in platform operations.' },
    { company: 'Akamai', period: 'Previous', description: 'Edge cloud, AKS platform reliability, traffic routing, security controls, and incident response.' },
    { company: 'Amazon Web Services', period: 'Aug 2019 – Mar 2021', description: 'Cloud infrastructure, Terraform automation, Kubernetes workloads, capacity, and customer-facing engineering.' }
  ]
};
