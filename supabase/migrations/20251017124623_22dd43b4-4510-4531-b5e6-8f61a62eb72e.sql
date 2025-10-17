-- Allow admins to update metal prices
CREATE POLICY "Admins can update metal prices"
ON metal_prices
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert metal prices"
ON metal_prices
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));