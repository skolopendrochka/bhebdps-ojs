const tooltipStates = [];

function resetTooltips() {
  tooltipStates.fill(false);
}

function handleTooltipClick(event, index) {
  event.preventDefault();
  const tooltipElement = document.getElementById('tooltip');

  if (tooltipStates[index]) {
    tooltipElement.classList.remove('tooltip_active');
    tooltipStates[index] = false;
    return;
  }
  resetTooltips();
  tooltipStates[index] = true;

  const targetElement = event.currentTarget;
  tooltipElement.style.left = `${targetElement.offsetLeft}px`;
  tooltipElement.style.top = `${targetElement.offsetTop + 20}px`;
  tooltipElement.innerHTML = targetElement.getAttribute('title');
  tooltipElement.classList.add('tooltip_active');
}

document.addEventListener('DOMContentLoaded', () => {
  const tooltipElements = document.querySelectorAll('.has-tooltip');

  tooltipElements.forEach((tooltip, index) => {
    tooltipStates[index] = false;
    tooltip.addEventListener('click', (event) => handleTooltipClick(event, index));
  });
});
