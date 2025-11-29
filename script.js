document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header')
  let last = 0
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    header.style.background = y > 24 ? 'rgba(10,15,20,.8)' : 'rgba(10,15,20,.6)'
    last = y
  })

  const bg = document.querySelector('.bg')
  let t = 0
  const loop = () => {
    t += 0.002
    bg.style.transform = `translate3d(${Math.sin(t)*6}px, ${Math.cos(t)*6}px, 0) scale(1.02)`
    requestAnimationFrame(loop)
  }
  loop()

  document.addEventListener('copy', (e) => {
    e.preventDefault()
  })
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === 'c') {
      e.preventDefault()
    }
  })

  const inviteCode = 'zuM99wuduD'
  const nameEl = document.getElementById('discord-name')
  const totalEl = document.getElementById('discord-total')
  const onlineEl = document.getElementById('discord-online')
  if (nameEl && totalEl && onlineEl) {
    fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`)
      .then(r => r.json())
      .then(d => {
        nameEl.textContent = (d && d.guild && d.guild.name) ? d.guild.name : 'Discord Server'
        totalEl.textContent = (d && d.approximate_member_count) ? d.approximate_member_count : '--'
        onlineEl.textContent = (d && d.approximate_presence_count) ? d.approximate_presence_count : '--'
      })
      .catch(() => {
        nameEl.textContent = 'Discord Server'
        totalEl.textContent = '--'
        onlineEl.textContent = '--'
      })
  }

  const ns = 'commando-web'
  const siteOnlineEl = document.getElementById('site-online')
  const siteUniqueEl = document.getElementById('site-unique')
  const uidKey = 'device_id_v1'
  const uniqueKey = 'unique_counted_v1'
  let uid = localStorage.getItem(uidKey)
  if (!uid) {
    uid = Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(uidKey, uid)
  }
  if (!localStorage.getItem(uniqueKey)) {
    fetch(`https://api.countapi.xyz/update/${ns}/total_unique?amount=1`, { method: 'GET' })
      .then(() => localStorage.setItem(uniqueKey, '1'))
      .catch(() => {})
  }
  fetch(`https://api.countapi.xyz/update/${ns}/online?amount=1`, { method: 'GET' }).catch(() => {})
  const dec = () => {
    fetch(`https://api.countapi.xyz/update/${ns}/online?amount=-1`, { method: 'GET', keepalive: true }).catch(() => {})
  }
  window.addEventListener('pagehide', dec)
  window.addEventListener('beforeunload', dec)
  const refresh = () => {
    fetch(`https://api.countapi.xyz/get/${ns}/online`).then(r => r.json()).then(d => {
      if (siteOnlineEl) siteOnlineEl.textContent = typeof d.value === 'number' ? d.value : '--'
    }).catch(() => { if (siteOnlineEl) siteOnlineEl.textContent = '--' })
    fetch(`https://api.countapi.xyz/get/${ns}/total_unique`).then(r => r.json()).then(d => {
      if (siteUniqueEl) siteUniqueEl.textContent = typeof d.value === 'number' ? d.value : '--'
    }).catch(() => { if (siteUniqueEl) siteUniqueEl.textContent = '--' })
  }
  refresh()
  setInterval(refresh, 10000)
})
