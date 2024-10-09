// Configuração da data de Manaus
//const now = new Date();
//now.setHours(now.getUTCHours() - 8);  // Ajuste para horário de Manaus
//document.getElementById('inputData').value = now.toISOString().slice(0, 16);



// Event listener for Model Input form submission
document.getElementById('modelForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const modelData = {
    plant: formData.get('plant'),
    partType: formData.get('partType'),
    partNumber: formData.get('partNumber'),
    model: formData.get('model'),
    vendor: formData.get('vendor'),
    boxQty: formData.get('boxQty')
  };
  
  saveModelData(modelData);
  alert('Model saved successfully!');
  event.target.reset();
});

// Save Model Data to Local Storage
function saveModelData(modelData) {
  let models = JSON.parse(localStorage.getItem('models')) || [];
  models.push(modelData);
  localStorage.setItem('models', JSON.stringify(models));
}

// P.O code generate
document.addEventListener("DOMContentLoaded", function() {
  const poInput = document.getElementById("po");

  function generatePO() {
      const date = new Date();
      const formattedDate = date.toISOString().replace(/[-T:.Z]/g, '').substring(0, 14);
      const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return formattedDate + sequence;
  }

  poInput.value = generatePO();
});


// Event listener for Mass Inspection Plan form submission
document.getElementById('inspectionForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const inspectionData = {
    po: formData.get('po'),
    planDate: formData.get('planDate'),
    partNumber: formData.get('partNumber'),
    model: formData.get('model'),
    line: formData.get('line'),
    vendor: formData.get('vendor'),
    planQty: formData.get('planQty'),
    partType: formData.get('partType'),
    boxQty: formData.get('boxQty'),
    remark: formData.get('remark')
  };

  saveInspectionPlan(inspectionData);
  alert('Inspection plan saved successfully!');
  event.target.reset();
});

// Save Inspection Plan Data to Local Storage
function saveInspectionPlan(inspectionData) {
  let plans = JSON.parse(localStorage.getItem('inspectionPlans')) || [];
  plans.push(inspectionData);
  localStorage.setItem('inspectionPlans', JSON.stringify(plans));
}

// Load Models for Inspection Plan based on Part Number
document.querySelector('input[name="partNumber"]')?.addEventListener('input', function (event) {
  const partNumber = event.target.value;
  const models = JSON.parse(localStorage.getItem('models')) || [];
  
  const matchingModels = models.filter(model => model.partNumber === partNumber);
  const modelSelect = document.querySelector('select[name="model"]');
  const vendorSelect = document.querySelector('select[name="vendor"]');
  const partTypeSelect = document.querySelector('select[name="partType"]');
  const boxQtyInput = document.querySelector('input[name="boxQty"]');
  
  modelSelect.innerHTML = '';
  vendorSelect.innerHTML = '';
  partTypeSelect.innerHTML = '';

  matchingModels.forEach(model => {
    modelSelect.innerHTML += `<option value="${model.model}">${model.model}</option>`;
    vendorSelect.innerHTML += `<option value="${model.vendor}">${model.vendor}</option>`;
    partTypeSelect.innerHTML += `<option value="${model.partType}">${model.partType}</option>`;
    boxQtyInput.value = model.boxQty;
  });
});

// Populate Inspection Plans Table
function loadInspectionPlans() {
  const plans = JSON.parse(localStorage.getItem('inspectionPlans')) || [];
  const tableBody = document.getElementById('inspectionPlansTable');
  tableBody.innerHTML = '';

  plans.forEach((plan, index) => {
    const row = `<tr>
      <td>${plan.planDate}</td>
      <td>${plan.line}</td>
      <td>${plan.partType}</td>
      <td>${plan.vendor}</td>
      <td>${plan.partNumber}</td>
      <td>${plan.model}</td>
      <td>${plan.planQty}</td>
      <td>0</td> <!-- Insp. Qty -->
      <td>0</td> <!-- OK -->
      <td>0</td> <!-- NG -->
      <td>0%</td> <!-- Rate -->
      <td>Pending</td> <!-- Plan Status -->
      <td><button onclick="goToInspection(${index})">Inspect</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Redirect to Inspection Page with selected Plan
function goToInspection(planIndex) {
  localStorage.setItem('selectedPlanIndex', planIndex);
  window.location.href = 'mass-inspection.html';
}

// Load Selected Plan for Inspection
function loadInspectionData() {
  const planIndex = localStorage.getItem('selectedPlanIndex');
  const plans = JSON.parse(localStorage.getItem('inspectionPlans')) || [];
  const plan = plans[planIndex];

  if (plan) {
    document.getElementById('model').textContent = plan.model;
    document.getElementById('partNumber').textContent = plan.partNumber;
    document.getElementById('modelPlan').textContent = plan.planQty;
    document.getElementById('inspectionProgress').textContent = '0'; // Initially 0
    document.getElementById('ngRate').textContent = '0%'; // Initially 0%
    document.getElementById('okCount').textContent = '0'; // Initially 0
    document.getElementById('ngCount').textContent = '0'; // Initially 0
  }
}

// Event listener for Mass Inspection submission
document.getElementById('inspectionForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const inspectionRecord = {
    date: formData.get('date'),
    time: formData.get('time'),
    partNumber: formData.get('partNumber'),
    model: formData.get('model'),
    serialNumber: formData.get('serialNumber'),
    status: formData.get('status')
  };

  document.getElementById('status').addEventListener('change', function() {
    if (this.value === 'NG') {
      document.getElementById('ng-fields').style.display = 'block';
    } else {
      document.getElementById('ng-fields').style.display = 'none';
    }
  });
  

  saveInspectionRecord(inspectionRecord);
  updateInspectionDashboard();
  alert('Inspection record saved successfully!');
  event.target.reset();
});

// Save Inspection Record to Local Storage
function saveInspectionRecord(record) {
  let inspections = JSON.parse(localStorage.getItem('inspections')) || [];
  inspections.push(record);
  localStorage.setItem('inspections', JSON.stringify(inspections));
}

// Update Inspection Dashboard
function updateInspectionDashboard() {
  let inspections = JSON.parse(localStorage.getItem('inspections')) || [];
  const okCount = inspections.filter(record => record.status === 'OK').length;
  const ngCount = inspections.filter(record => record.status === 'NG').length;
  const totalCount = inspections.length;

  document.getElementById('okCount').textContent = okCount;
  document.getElementById('ngCount').textContent = ngCount;
  document.getElementById('inspectionProgress').textContent = ((totalCount / document.getElementById('modelPlan').textContent) * 100).toFixed(2);
  document.getElementById('ngRate').textContent = ((ngCount / totalCount) * 100).toFixed(2) + '%';
}

// Load functions for each page
window.onload = function () {
  loadInspectionPlans();
  loadInspectionData();
};