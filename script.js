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
})
