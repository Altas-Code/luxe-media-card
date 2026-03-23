import '../src/luxe-media-card';

class DemoHaIcon extends HTMLElement {
  static get observedAttributes() {
    return ['icon'];
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const icon = this.getAttribute('icon') ?? '';
    const glyphs: Record<string, string> = {
      'mdi:play': '▶',
      'mdi:pause': '⏸',
      'mdi:skip-next': '⏭',
      'mdi:skip-previous': '⏮'
    };

    this.textContent = glyphs[icon] ?? '•';
    this.setAttribute('aria-hidden', 'true');
  }
}

if (!customElements.get('ha-icon')) {
  customElements.define('ha-icon', DemoHaIcon);
}

const states = [
  {
    title: 'Playing / compact',
    config: { entity: 'media_player.demo', height: 'compact', show_skip_controls: true, text_overflow: 'truncate' },
    hass: {
      states: {
        'media_player.demo': {
          entity_id: 'media_player.demo',
          state: 'playing',
          attributes: {
            friendly_name: 'Studio Display',
            media_title: 'Midnight City',
            media_artist: 'M83',
            entity_picture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
            supported_features: 48
          }
        }
      },
      callService: (...args: unknown[]) => console.log('service call', args)
    }
  },
  {
    title: 'Paused / tall',
    config: { entity: 'media_player.demo', height: 'tall', show_skip_controls: true, text_overflow: 'scroll' },
    hass: {
      states: {
        'media_player.demo': {
          entity_id: 'media_player.demo',
          state: 'paused',
          attributes: {
            friendly_name: 'Kitchen Speaker',
            media_title: 'A very long podcast episode title that should stay on a single line and scroll cleanly',
            media_artist: 'The Extremely Talkative Show With Surprisingly Long Metadata',
            entity_picture: null,
            supported_features: 0
          }
        }
      },
      callService: (...args: unknown[]) => console.log('service call', args)
    }
  }
];

const root = document.querySelector('#demo-root');

for (const entry of states) {
  const section = document.createElement('section');
  const heading = document.createElement('h2');
  heading.textContent = entry.title;

  const frame = document.createElement('div');
  frame.className = 'frame';

  const card = document.createElement('luxe-media-card') as any;
  card.setConfig(entry.config);
  card.hass = entry.hass;

  frame.append(card);
  section.append(heading, frame);
  root?.append(section);
}
