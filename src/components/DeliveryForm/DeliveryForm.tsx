import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Delivery, DeliveryStatus } from "../../types";
import { useAppDispatch } from "../../store";
import {
  addNewDelivery,
  editDelivery,
} from "../../features/deliveries/deliveriesThunks";

interface DeliveryFormProps {
  delivery?: Delivery;
  onClose: () => void;
  isEdit?: boolean;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  delivery,
  onClose,
  isEdit = false,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Omit<Delivery, "id">>({
    date: new Date().toISOString().split("T")[0],
    recipient: "",
    address: "",
    status: "Pending",
  });

  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    if (delivery) {
      setFormData({
        date: delivery.date,
        recipient: delivery.recipient,
        address: delivery.address,
        status: delivery.status,
      });
    }
  }, [delivery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: SelectChangeEvent<DeliveryStatus>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as DeliveryStatus,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        setDateError("Date must be today or in the future");
      } else {
        setDateError(null);
        setFormData((prev) => ({
          ...prev,
          date: date.toISOString().split("T")[0],
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dateError) return;

    try {
      if (isEdit && delivery) {
        await dispatch(editDelivery(delivery.id, formData));
      } else {
        await dispatch(addNewDelivery(formData));
      }
      onClose();
    } catch (error) {
      console.error("Error saving delivery:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Delivery Date"
          value={new Date(formData.date)}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
              error: !!dateError,
              helperText: dateError,
              required: true,
            },
          }}
        />
      </LocalizationProvider>

      <TextField
        name="recipient"
        label="Recipient"
        value={formData.recipient}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        multiline
        rows={3}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleStatusChange}
          label="Status"
          required
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Transit">In Transit</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Not Delivered">Not Delivered</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeliveryForm;
